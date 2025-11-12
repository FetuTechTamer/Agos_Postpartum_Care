<?php
include 'connect.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Get latest 3 tags from Blog table (only published blogs)
$sql = "SELECT tag 
        FROM Blog 
        WHERE status='publish' AND tag IS NOT NULL AND tag != '' 
        ORDER BY published_date DESC 
        LIMIT 3";

$result = $conn->query($sql);

$tags = [];
while ($row = $result->fetch_assoc()) {
    $tags[] = $row['tag'];
}

echo json_encode($tags);
