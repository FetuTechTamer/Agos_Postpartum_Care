<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");


include "connect.php";

try {
    if ($_SERVER["REQUEST_METHOD"] !== "POST") {
        throw new Exception("Invalid request method.");
    }

    $data = json_decode(file_get_contents("php://input"), true);
    $bookingId = $data['bookingId'] ?? '';

    if (!$bookingId) throw new Exception("Booking ID is required.");

    $stmt = $conn->prepare("DELETE FROM book WHERE id = ?");
    $stmt->bind_param("s", $bookingId);

    if (!$stmt->execute()) {
        throw new Exception("Failed to delete booking: " . $stmt->error);
    }

    $stmt->close();
    $conn->close();

    echo json_encode([
        "status" => "success",
        "message" => "Old booking deleted successfully."
    ]);
} catch (Exception $e) {
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}
?>
