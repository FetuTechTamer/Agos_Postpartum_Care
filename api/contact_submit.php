<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include "connect.php";

// Get POST data
$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data['name'], $data['email'], $data['message'])) {
    echo json_encode([
        "status" => "error",
        "message" => "Missing required fields."
    ]);
    exit;
}

$name = $conn->real_escape_string($data['name']);
$email = $conn->real_escape_string($data['email']);
$message = $conn->real_escape_string($data['message']);
$phone = isset($data['phone']) ? $conn->real_escape_string($data['phone']) : '';

// ----------------------------
// Check if table is empty
// ----------------------------
$checkEmpty = $conn->query("SELECT COUNT(*) AS total FROM messages");
$row = $checkEmpty->fetch_assoc();
if ($row['total'] == 0) {
    // Reset AUTO_INCREMENT
    $conn->query("ALTER TABLE messages AUTO_INCREMENT = 1");
}

// ----------------------------
// Insert message
// ----------------------------
$sql = "INSERT INTO messages (name, email, message, phone) VALUES ('$name', '$email', '$message', '$phone')";

if ($conn->query($sql) === TRUE) {
    echo json_encode([
        "status" => "success",
        "message" => "Message sent successfully!"
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Database error: " . $conn->error
    ]);
}

$conn->close();
?>
