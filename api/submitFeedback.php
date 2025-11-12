<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include 'connect.php'; 

// --- Get POST data safely ---
$employee_name = trim($_POST['employee_name'] ?? '');
$employee_id   = strtoupper(trim($_POST['employee_id'] ?? ''));
$position      = trim($_POST['position'] ?? '');
$client_name   = trim($_POST['client_name'] ?? '');
$client_email  = trim($_POST['client_email'] ?? '');
$rating        = (int)($_POST['rating'] ?? 0);
$comments      = trim($_POST['comments'] ?? '');
$service_date  = $_POST['service_date'] ?? null;

// --- Basic validation ---
if (!$employee_name || !$employee_id || !$position || !$client_name || !$rating || !$service_date) {
    echo json_encode(['status' => 'error', 'message' => 'Please fill all required fields correctly.']);
    exit;
}

// --- Check if table is empty ---
$checkEmpty = $conn->query("SELECT COUNT(*) AS total FROM feedback");
if ($checkEmpty) {
    $row = $checkEmpty->fetch_assoc();
    if ((int)$row['total'] === 0) {
        // Reset AUTO_INCREMENT if empty
        $conn->query("ALTER TABLE feedback AUTO_INCREMENT = 1");
    }
}

// --- Insert feedback safely ---
$sql = "INSERT INTO feedback 
        (employee_id, employee_name, position, client_name, client_email, rating, comments, service_date) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $conn->error]);
    exit;
}

$stmt->bind_param(
    "sssssis",
    $employee_id,
    $employee_name,
    $position,
    $client_name,
    $client_email,
    $rating,
    $comments,
    $service_date
);

if ($stmt->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'Feedback submitted successfully!']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to submit feedback: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
