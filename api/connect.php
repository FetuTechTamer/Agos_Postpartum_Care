<?php
// connect.php
$db_name   = 'customer_database';
$server    = 'localhost';
$user_name = 'root';
$password  = '';

$conn = new mysqli($server, $user_name, $password, $db_name);

if ($conn->connect_error) {
    die(json_encode([
        "error" => true,
        "message" => "Connection failed: " . $conn->connect_error
    ]));
}
?>
