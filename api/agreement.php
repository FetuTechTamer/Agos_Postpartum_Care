<?php
// api/agreement.php

// ---------------------------
// Headers for CORS & JSON
// ---------------------------
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Include database connection
require_once("connect.php");

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode([
        "status" => "error",
        "message" => "Invalid request method."
    ]);
    exit;
}

// Detect language
$language = isset($_POST['language']) && $_POST['language'] === 'am' ? 'am' : 'en';

// Helper for multilingual messages
function msg($en, $am, $lang) {
    return $lang === 'am' ? $am : $en;
}

// ---------------------------
// Required fields
// ---------------------------
$required = ['fullName', 'address', 'subCity', 'woreda', 'houseNumber', 'phone', 'booking_id'];

// ---------------------------
// Debug log (optional)
// ---------------------------
// error_log("POST data: " . print_r($_POST, true));

// Validate required fields
$missing = [];
foreach ($required as $field) {
    if (empty($_POST[$field])) {
        $missing[] = $field;
    }
}

if (!empty($missing)) {
    echo json_encode([
        "status" => "error",
        "message" => msg(
            "Missing required fields: " . implode(", ", $missing),
            "የሚጠየቁ መስፈርቶች አልተሞሉም፦ " . implode(", ", $missing),
            $language
        )
    ]);
    exit;
}

// ---------------------------
// Sanitize inputs
// ---------------------------
$fullName     = htmlspecialchars(trim($_POST['fullName']));
$address      = htmlspecialchars(trim($_POST['address']));
$subCity      = htmlspecialchars(trim($_POST['subCity']));
$woreda       = htmlspecialchars(trim($_POST['woreda']));
$houseNumber  = htmlspecialchars(trim($_POST['houseNumber']));
$phone        = htmlspecialchars(trim($_POST['phone']));
$booking_id   = htmlspecialchars(trim($_POST['booking_id']));

// ---------------------------
// Validate phone
// ---------------------------
$phone_clean = str_replace([' ', '-'], '', $phone);
if (!preg_match('/^09\d{8}$/', $phone_clean) && !preg_match('/^\+2519\d{8}$/', $phone_clean)) {
    echo json_encode([
        "status" => "error",
        "message" => msg(
            "Invalid phone number format. Must start with 09 (10 digits) or +251 (13 digits).",
            "የስልክ ቁጥሩ ትክክል አይደለም። እባክዎን ትክክለኛ የኢትዮጵያ ስልክ ቁጥር ያስገቡ።",
            $language
        )
    ]);
    exit;
}

try {
    $conn->begin_transaction();

    // ---------------------------
    // Validate booking exists
    // ---------------------------
    $checkBooking = $conn->prepare("SELECT id FROM book WHERE id = ? LIMIT 1");
    $checkBooking->bind_param("s", $booking_id);
    $checkBooking->execute();
    $checkBooking->store_result();
    if ($checkBooking->num_rows === 0) {
        throw new Exception(msg(
            "Invalid booking ID.",
            "የተሰጠው የቦኪንግ መለያ ትክክል አይደለም።",
            $language
        ));
    }
    $checkBooking->close();

    // ---------------------------
    // ✅ Prevent multiple submissions
    // ---------------------------
    $checkDuplicate = $conn->prepare("SELECT id FROM clients WHERE booking_id = ? LIMIT 1");
    $checkDuplicate->bind_param("s", $booking_id);
    $checkDuplicate->execute();
    $checkDuplicate->store_result();

    if ($checkDuplicate->num_rows > 0) {
        throw new Exception(msg(
            "Agreement already submitted for this booking.",
            "ስምምነት በዚህ ቦኪንግ መለያ አስቀድሞ ተላክቷል።",
            $language
        ));
    }
    $checkDuplicate->close();

    // ---------------------------
    // Generate new client ID
    // ---------------------------
    $result = $conn->query("SELECT id FROM clients ORDER BY id DESC LIMIT 1");
    if ($result && $row = $result->fetch_assoc()) {
        $lastIdNum = intval(substr($row['id'], 2));
        $newId = 'CL' . str_pad($lastIdNum + 1, 3, '0', STR_PAD_LEFT);
    } else {
        $newId = 'CL001';
    }

    // ---------------------------
    // Insert new client record
    // ---------------------------
    $stmt = $conn->prepare("
        INSERT INTO clients 
        (id, booking_id, fullName, address, subCity, woreda, houseNumber, phone, agreed) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)
    ");
    $stmt->bind_param("ssssssss", $newId, $booking_id, $fullName, $address, $subCity, $woreda, $houseNumber, $phone);

    if (!$stmt->execute()) {
        if ($conn->errno == 1062) {
            throw new Exception(msg(
                "This phone number has already been used for another agreement.",
                "ይህ ስልክ ቁጥር አስቀድሞ በሌላ ስምምነት ተጠቅመዋል።",
                $language
            ));
        } else {
            throw new Exception(msg(
                "Failed to save agreement. Please try again.",
                "ስምምነቱን ማስቀመጥ አልተሳካም። እባክዎን ደግመው ይሞክሩ።",
                $language
            ));
        }
    }

    $stmt->close();
    $conn->commit();

    echo json_encode([
        "status" => "success",
        "message" => msg(
            "Agreement submitted successfully!",
            "ስምምነቱ በተሳካ ሁኔታ ተላክ።",
            $language
        ),
        "client_id" => $newId
    ]);

} catch (Exception $e) {
    $conn->rollback();
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
} finally {
    $conn->close();
}
?>
