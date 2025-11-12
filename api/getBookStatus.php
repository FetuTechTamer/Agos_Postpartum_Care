<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include 'connect.php';

$id = $_GET['id'] ?? '';
if (!$id) {
    echo json_encode(['status'=>'error','message'=>'Booking ID is required']);
    exit;
}

$sql = "SELECT status,  booking_code FROM book WHERE id=? LIMIT 1";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $id);
$stmt->execute();
$result = $stmt->get_result();
$booking = $result->fetch_assoc();

if ($booking) {
    echo json_encode([
        'status'=>'success',
        'data'=>[
            'id'=>$id,
            'booking_code'=>$booking['booking_code'],
            'status'=>$booking['status']
        ]
    ]);
} else {
    echo json_encode(['status'=>'error','message'=>'Booking not found']);
}

$stmt->close();
$conn->close();
?>
