<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $adsoyad = isset($_POST['adsoyad']) ? $_POST['adsoyad'] : '';
    $sirketad = isset($_POST['sirketad']) ? $_POST['sirketad'] : '';
    $email = isset($_POST['email']) ? $_POST['email'] : '';
    $telefon = isset($_POST['telefon']) ? $_POST['telefon'] : '';
    $mesaj = isset($_POST['mesaj']) ? $_POST['mesaj'] : '';

    $recaptchaCevabi = isset($_POST['g-recaptcha-response']) ? $_POST['g-recaptcha-response'] : '';
    $gizliAnahtar = '6LckpJwqAAAAAE8D7qZRTExx1MIt2xZ9QFqyOL_0';
    $recaptchaUrl = 'https://www.google.com/recaptcha/api/siteverify';
    $cevap = file_get_contents($recaptchaUrl . "?secret=" . $gizliAnahtar . "&response=" . $recaptchaCevabi);
    $cevapDogrula = json_decode($cevap, true);
    if (intval($cevapDogrula['success']) !== 1) {
        echo 'Robot doğrulaması başarısız. Lütfen tekrar deneyin.';
        exit;
    }
    
    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'wexillegal@gmail.com';
        $mail->Password = 'ryhvyadinpyhondc';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        $mail->setFrom('wexillegal@gmail.com', 'WexPortfolyo Bot');
        $mail->addAddress('eyupaslnn00@gmail.com', 'Eyüp Aslan');

        $mail->isHTML(true);
        $mail->Subject = 'Portofolyo Websitesi İletişim';
        $mail->CharSet = 'UTF-8';
        $bodyİcerik = "
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                background: linear-gradient(to right, #ff7e5f, #feb47b); /* Gradyan arka plan */
                color: #333;
                text-align: center;
                padding: 40px;
            }
            .container {
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                padding: 30px;
                max-width: 600px;
                margin: 0 auto;
                text-align: left;
            }
            h2 {
                color: #ff7e5f;
                font-size: 24px;
                text-align: center;
            }
            .content {
                line-height: 1.6;
                font-size: 16px;
            }
            .content p {
                margin: 10px 0;
            }
            .footer {
                font-size: 12px;
                color: #888;
                text-align: center;
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
        <div class='container'>
            <h2>Yeni İletişim Formu Mesajı</h2>
            <div class='content'>
                <p><strong>Ad Soyad:</strong> $adsoyad</p>
                <p><strong>Şirket İsmi:</strong> $sirketad</p>
                <p><strong>E-posta:</strong> $email</p>
                <p><strong>Telefon Numarası:</strong> $telefon</p>
                <p><strong>Mesaj:</strong> $mesaj</p>
            </div>
            <div class='footer'>
                <p>Bu mesaj, WexPortfolyo Bot tarafından gönderilmiştir.</p>
            </div>
        </div>
    </body>
    </html>
";
        $mail->Body = $bodyİcerik;

        $mail->send();
        echo 'Mesajınız başarıyla gönderildi.';

    } catch (Exception $e) {
        echo "Mesaj gönderilemedi. Mail Hatası: {$mail->ErrorInfo}";
    }
}
?>
