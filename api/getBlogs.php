<?php
include 'connect.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$limit = 6; // blogs per page
$offset = ($page - 1) * $limit;

// Get total number of blogs
$countResult = $conn->query("SELECT COUNT(*) AS total FROM Blog WHERE status='publish'");
$totalBlogs = $countResult->fetch_assoc()['total'];
$totalPages = ceil($totalBlogs / $limit);

// Fetch blogs with author info
$sql = "SELECT b.id, b.title, b.slug, b.content, b.image AS image, b.tag, b.published_date,
        a.name AS author_name, a.image AS author_image, a.position AS author_position
        FROM Blog b
        JOIN Author a ON b.author_id = a.id
        WHERE b.status='publish'
        ORDER BY b.published_date DESC
        LIMIT ?, ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $offset, $limit);
$stmt->execute();
$result = $stmt->get_result();

$blogs = [];
while ($row = $result->fetch_assoc()) {
    $blogs[] = [
        "id" => $row['id'],
        "title" => $row['title'],
        "slug" => $row['slug'],
        "content" => $row['content'],  
        "image" => !empty($row['image']) ? $row['image'] : '/images/default-blog-image.jpg',
        "tag" => [$row['tag']],
        "published_date" => $row['published_date'],
        "author" => [
            "name" => $row['author_name'],
            "image" => $row['author_image'],
            "designation" => $row['author_position']
        ]
    ];
}

echo json_encode([
    "blogs" => $blogs,
    "totalPages" => $totalPages,
    "currentPage" => $page
]);
?>


