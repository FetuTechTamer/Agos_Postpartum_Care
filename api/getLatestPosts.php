<?php
include 'connect.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Query: latest 3 published blogs
$sql = "SELECT id, title, slug, image, published_date 
        FROM Blog 
        WHERE status = 'publish' 
        ORDER BY published_date DESC 
        LIMIT 3";

$result = $conn->query($sql);

$posts = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $posts[] = [
            "id" => $row["id"],
            "title" => $row["title"],
            "slug" => $row["slug"],
            "image" => !empty($row["image"]) ? $row["image"] : "/images/default-blog-image.jpg",
            "published_date" => $row["published_date"],
        ];
    }
}

echo json_encode($posts);
$conn->close();
?>
