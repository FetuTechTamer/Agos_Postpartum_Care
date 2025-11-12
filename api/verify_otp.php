<?php
// =========================
// CORS headers
// =========================
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=utf-8');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit();

// =========================
// Include database connection
// =========================
require 'connect.php';

// =========================
// Get POST data
// =========================
$data = json_decode(file_get_contents("php://input"), true);
$email = trim($data['email'] ?? '');
$entered_otp = trim($data['otp'] ?? '');

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["status" => "error", "message" => "Invalid email"]);
    exit();
}

if (empty($entered_otp)) {
    echo json_encode(["status" => "error", "message" => "OTP is required"]);
    exit();
}

// =========================
// Check if email is already subscribed
// =========================
$check_sub = $conn->prepare("SELECT id FROM newsletter_subscribers WHERE email=? LIMIT 1");
$check_sub->bind_param("s", $email);
$check_sub->execute();
$sub_result = $check_sub->get_result();

if ($sub_result->num_rows > 0) {
    echo json_encode(["status" => "error", "message" => "This email is already subscribed!"]);
    exit();
}

// =========================
// Check OTP in database (valid and not expired)
// =========================
$stmt = $conn->prepare("
    SELECT * FROM newsletter_otp
    WHERE email=? AND otp=? AND status='pending' AND expires_at >= NOW()
    ORDER BY created_at DESC
    LIMIT 1
");
$stmt->bind_param("ss", $email, $entered_otp);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
    // Mark OTP as verified
    $update = $conn->prepare("UPDATE newsletter_otp SET status='verified' WHERE id=?");
    $update->bind_param("i", $row['id']);
    $update->execute();

    // Add to subscribers (ignore if already exists)
    $insert = $conn->prepare("INSERT IGNORE INTO newsletter_subscribers (email) VALUES (?)");
    $insert->bind_param("s", $email);
    $insert->execute();

    echo json_encode([
        "status" => "success",
        "message" => " ",
        "type" => "subscribed"  // indicate to React this is a full subscription
    ]);
} else {
    // Check if OTP exists but expired
    $stmt_expired = $conn->prepare("
        SELECT * FROM newsletter_otp
        WHERE email=? AND otp=? AND status='pending'
        ORDER BY created_at DESC
        LIMIT 1
    ");
    $stmt_expired->bind_param("ss", $email, $entered_otp);
    $stmt_expired->execute();
    $expired_result = $stmt_expired->get_result();

    if ($expired_result->num_rows > 0) {
        echo json_encode(["status" => "error", "message" => "OTP expired. Please request a new one."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid OTP."]);
    }
}
