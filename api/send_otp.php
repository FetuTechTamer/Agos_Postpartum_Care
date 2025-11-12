<?php
header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit;

ini_set('display_errors', 1);
error_reporting(E_ALL);

require_once __DIR__ . '/../PHPMailer/src/PHPMailer.php';
require_once __DIR__ . '/../PHPMailer/src/SMTP.php';
require_once __DIR__ . '/../PHPMailer/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

include __DIR__ . '/connect.php';

try {
    $data = json_decode(file_get_contents('php://input'), true);
    $email = trim($data['email'] ?? '');
    $name  = trim($data['name'] ?? '');

    if (!$email || !$name) {
        echo json_encode(['status'=>'error','message'=>'Name and email are required']);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['status'=>'error','message'=>'Invalid email address']);
        exit;
    }

    // -------------------------
    // Check if already subscribed
    // -------------------------
    $check = $conn->prepare("SELECT id FROM newsletter_subscribers WHERE email=? LIMIT 1");
    $check->bind_param("s", $email);
    $check->execute();
    $result = $check->get_result();

    if ($result->num_rows > 0) {
        echo json_encode(['status'=>'error','message'=>'This email is already subscribed!']);
        exit;
    }

    // -------------------------
    // Reset AUTO_INCREMENT if table is empty
    // -------------------------
    $countRes = $conn->query("SELECT COUNT(*) AS total FROM newsletter_subscribers");
    $row = $countRes->fetch_assoc();
    if ($row['total'] == 0) {
        $conn->query("ALTER TABLE newsletter_subscribers AUTO_INCREMENT = 1");
    }

    // -------------------------
    // Generate 6-digit OTP
    // -------------------------
    $code = str_pad(rand(0, 999999), 6, '0', STR_PAD_LEFT);
    $expires_at = date("Y-m-d H:i:s", strtotime("+10 minutes"));

    // Insert or update OTP in DB
    $stmt = $conn->prepare("
        INSERT INTO newsletter_otp (email, name, otp, expires_at)
        VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE otp=?, expires_at=?, status='pending', name=?
    ");
    $stmt->bind_param("sssssss", $email, $name, $code, $expires_at, $code, $expires_at, $name);
    $stmt->execute();

    // -------------------------
    // Send OTP via Mailtrap
    // -------------------------
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host       = 'sandbox.smtp.mailtrap.io';
    $mail->SMTPAuth   = true;
    $mail->Username   = '744e3e01bc8210'; // Mailtrap username
    $mail->Password   = '88c9bc7d401ff8'; // Mailtrap password
    $mail->Port       = 2525;              // Mailtrap port
    $mail->SMTPSecure = null;

    $mail->setFrom('Agospostpartumcare@gmail.com', 'Agos Postpartum Care');
    $mail->addAddress($email, $name);
    $mail->isHTML(true);

    $mail->Subject = "Agos PostPartum Care Subscription Details";

    // HTML email body
    $mail->Body = "
    <div style='font-family: Arial, sans-serif; max-width: 650px; margin: auto; border: 1px solid #e0e0e0; border-radius: 12px; padding: 35px; background: #f8f9fa; color: #333;'>
        <div style='text-align: center; margin-bottom: 25px;'>
            <h1 style='color: #2F80ED; font-size: 30px; margin: 0;'>Agos Postpartum Care</h1>
            <p style='margin: 5px 0 0; font-size: 16px; color: #555;'>Your Personal Support for Postpartum Health</p>
        </div>
        <p style='font-size: 16px;'>Hello <strong>" . htmlspecialchars($name) . "</strong>,</p>
        <p style='font-size: 16px; color: #555; line-height: 1.6;'>
            Thank you for subscribing to Agos Postpartum Care updates! You will receive expert tips and resources.
        </p>
        <p style='font-size: 16px; margin-top: 20px;'>Your verification code:</p>
        <div style='text-align: center; margin: 25px 0;'>
            <span style='display: inline-block; font-size: 36px; font-weight: bold; color: #2F80ED; background: #e6f0ff; padding: 20px 35px; border-radius: 10px; letter-spacing: 6px; box-shadow: 0px 4px 8px rgba(0,0,0,0.05);'>" . htmlspecialchars($code) . "</span>
        </div>
        <p style='font-size: 14px; color: #555; text-align: center;'>
            Expires in <strong>10 minutes</strong>.<br>
            Request sent at: " . date("Y-m-d H:i:s") . "
        </p>
    </div>
    ";

    $mail->AltBody = "Hello {$name},\nYour 6-digit code is: {$code}\nExpires in 10 minutes.\nRequest sent at: " . date("Y-m-d H:i:s");

    $mail->send();

    echo json_encode(['status'=>'success','message'=>"6-digit code sent to {$email}."]);

} catch (Exception $e) {
    echo json_encode(['status'=>'error','message'=>"Failed to send code: " . $e->getMessage()]);
}
?>
