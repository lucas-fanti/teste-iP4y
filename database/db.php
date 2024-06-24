<?php
$host = 'localhost';
$db = 'sistema_cadastro';
$user = 'admin_user_ip4y';
$pass = 'admin_password';

/**
 * Utilizei o xampp
 * Precisa descomentar o "extension=pdo_pgsql e o extension=pgsql". Tirar o ';' do php.ini.
*/

try {
    $pdo = new PDO("pgsql:host=$host;dbname=$db", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Erro na conexão: " . $e->getMessage());
}
?>
