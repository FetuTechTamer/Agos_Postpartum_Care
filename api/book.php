<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include "connect.php";

try {
    if ($_SERVER["REQUEST_METHOD"] !== "POST") {
        throw new Exception("Invalid request method.");
    }

    // -----------------------------
    // Collect & sanitize fields
    // -----------------------------
    $fullName   = trim($_POST['fullName'] ?? '');
    $address    = trim($_POST['address'] ?? '');
    $age        = isset($_POST['age']) ? (int) $_POST['age'] : 0;
    $phone      = trim($_POST['phone'] ?? '');
    $dueDate    = $_POST['dueDate'] ?? '';
    $weightBefore  = $_POST['weightBefore'] ?? 0;
    $currentWeight = $_POST['currentWeight'] ?? 0;
    $deliveryType  = $_POST['deliveryType'] ?? '';
    $babyGender    = $_POST['babyGender'] ?? '';
    $pregnancyComplications = $_POST['complications'] ?? '';
    $allergies    = $_POST['allergies'] ?? '';
    $breastfeed   = $_POST['breastfeed'] ?? '';
    $dietary      = $_POST['dietary'] ?? '';
    $language     = $_POST['language'] ?? '';
    $notes        = $_POST['notes'] ?? '';
    $houseType    = $_POST['houseType'] ?? '';

    $errors = [];

    // -----------------------------
    // Validation
    // -----------------------------
    if (!$fullName) $errors[] = "Full Name is required.";
    if (!$address) $errors[] = "Address is required.";
    if ($age < 18) $errors[] = "Age must be at least 18.";
    if (!$dueDate) $errors[] = "Due Date is required.";
    if (!in_array($deliveryType, ['normal','cesarean','unknown'])) $errors[] = "Invalid delivery type.";
    if (!in_array($babyGender, ['male','female','unknown'])) $errors[] = "Invalid baby gender.";
    if (!in_array($breastfeed, ['yes','no','maybe'])) $errors[] = "Invalid breastfeeding value.";
    if (!$houseType) $errors[] = "House type is required.";
 
    // Phone validation
    $phone_clean = str_replace([' ', '-'], '', $phone);
    if (!preg_match('/^09\d{8}$/', $phone_clean) && !preg_match('/^\+2519\d{8}$/', $phone_clean)) {
        $errors[] = "Phone must start with 09 (10 digits) or +251 (13 digits).";
    }

    if (!empty($errors)) {
        throw new Exception(implode(" ", $errors));
    }

    // Validate due date
    $date = DateTime::createFromFormat('Y-m-d', $dueDate);
    if (!$date) throw new Exception("Invalid Due Date format.");
    $dueDate = $date->format('Y-m-d');

    // -----------------------------
    // File upload handler
    // -----------------------------
    $uploadDir = __DIR__ . "/uploads/";
    if (!file_exists($uploadDir)) mkdir($uploadDir, 0777, true);

    function uploadFile($fileInput, $prefix) {
        global $uploadDir;
        if (!isset($_FILES[$fileInput]) || $_FILES[$fileInput]["error"] !== UPLOAD_ERR_OK) {
            throw new Exception("$fileInput is required or failed to upload.");
        }

        $tmpName = $_FILES[$fileInput]["tmp_name"];
        $originalName = basename($_FILES[$fileInput]["name"]);
        $fileExt = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));
        $allowedExt = ["jpg","jpeg","png","pdf"];
        if (!in_array($fileExt, $allowedExt)) throw new Exception("Invalid file type for $fileInput.");
        if ($_FILES[$fileInput]["size"] > 2 * 1024 * 1024) throw new Exception("$fileInput file size too large. Max 2MB.");

        $newName = time() . "_{$prefix}_" . preg_replace("/[^a-zA-Z0-9\.\-_]/","_", $originalName);
        $filePath = $uploadDir . $newName;
        if (!move_uploaded_file($tmpName, $filePath)) throw new Exception("Failed to upload $fileInput.");

        return "uploads/" . $newName;
    }

    $nationalIdFile = uploadFile("nationalId", "national");
    $paymentFile    = uploadFile("paymentScreenshot", "payment");

    // -----------------------------
    // Generate smart booking ID 
    // -----------------------------
    $prefix = 'B';
    $result = $conn->query("SELECT id FROM book WHERE id LIKE '{$prefix}%' ORDER BY CAST(SUBSTRING(id, 2) AS UNSIGNED) ASC");

    $existing = [];
    while ($row = $result->fetch_assoc()) {
        $existing[] = (int)substr($row['id'], 1); // strip 'B' and convert to number
    }
    sort($existing);

    $newNum = 1;
    foreach ($existing as $num) {
        if ($num == $newNum) {
            $newNum++;
        } else {
            break; // first missing number
        }
    }

    $nextId = $prefix . str_pad($newNum, 3, '0', STR_PAD_LEFT); // B001, B002, etc.

    // -----------------------------
    // Generate booking_code (random 6 digits)
    // -----------------------------
    do {
        $booking_code = str_pad(rand(0, 999999), 6, '0', STR_PAD_LEFT);
        $check = $conn->prepare("SELECT id FROM book WHERE booking_code = ?");
        $check->bind_param("s", $booking_code);
        $check->execute();
        $result = $check->get_result();
    } while ($result->num_rows > 0);
    $check->close();

    $status = 'pending';

    

    // -----------------------------
    // Insert booking record
    // -----------------------------
    $stmt = $conn->prepare("
        INSERT INTO book 
        (id, fullName, address, age, phone, nationalId, dueDate, weightBefore, currentWeight, deliveryType, babyGender,
        pregnancyComplications, allergies, breastfeed, dietary, language, notes, houseType, paymentScreenshot, status, booking_code)
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    ");

    $stmt->bind_param(
        "sssisssddssssssssssss",
        $nextId, $fullName, $address, $age, $phone, $nationalIdFile, $dueDate, $weightBefore, $currentWeight,
        $deliveryType, $babyGender, $pregnancyComplications, $allergies, $breastfeed, $dietary,
        $language, $notes, $houseType, $paymentFile, $status, $booking_code
    );

    if (!$stmt->execute()) {
        throw new Exception("Database error: " . $stmt->error);
    }

    echo json_encode([
        "status" => "success",
        "message" => "Booking submitted successfully!",
        "id" => $nextId,
        "booking_code" => $booking_code
    ]);

    $stmt->close();
    $conn->close();

} catch (Exception $e) {
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}
?>
