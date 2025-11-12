<?php
include 'connect.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');



// Get slug from query string
$slug = '';
if (isset($_GET['slug'])) {
    $slug = trim($_GET['slug']);
} elseif (isset($_SERVER['PATH_INFO'])) {
    $slug = trim(ltrim($_SERVER['PATH_INFO'], '/'));
}

if (!$slug) {
    http_response_code(400);
    echo json_encode(['error' => 'Slug is required']);
    exit;
}

// Fetch blog + author info
$sql = "SELECT b.id, b.title, b.slug, b.published_date, b.image, b.tag,
               a.name AS author_name, a.image AS author_image, a.position AS author_position
        FROM Blog b
        LEFT JOIN Author a ON b.author_id = a.id
        WHERE b.slug = ? AND b.status = 'publish'
        LIMIT 1";

$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $slug);
$stmt->execute();
$result = $stmt->get_result();
$blog = $result->fetch_assoc();

if (!$blog) {
    http_response_code(404);
    echo json_encode(['error' => 'Blog not found']);
    exit;
}

// Fetch blog detail
$sql2 = "SELECT content1, detail_image, content2, quote, summary,
                tag1, tag2, tag3
         FROM BlogDetail WHERE blog_id = ? LIMIT 1";

$stmt2 = $conn->prepare($sql2);
$stmt2->bind_param("i", $blog['id']);
$stmt2->execute();
$result2 = $stmt2->get_result();
$detail = $result2->fetch_assoc();

// Base path relative to project root / public folder
$base_url = '/Agos_Postpartum_Care/public/blog/images/blog/';
$author_base_url = '/Agos_Postpartum_Care/public/blog/images/authors/';

$blog['image'] = !empty($blog['blog_image']) 
    ? $base_url . basename($blog['blog_image']) 
    : '/Agos_Postpartum_Care/public/blog/images/blog/default-blog-image.jpg';

$blog['author_image'] = !empty($blog['author_image']) 
    ? $author_base_url . basename($blog['author_image']) 
    : '/Agos_Postpartum_Care/public/blog/images/authors/user-placeholder.png';

if ($detail && !empty($detail['detail_image'])) {
    $detail['detail_image'] = $base_url . basename($detail['detail_image']);
}

// Attach author info
$blog['author'] = [
    'name' => $blog['author_name'],
    'image' => $blog['author_image'],
    'designation' => $blog['author_position']
];

// Attach blog detail
$blog['detail'] = $detail ?: (object)[];

// Return JSON
echo json_encode($blog, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
