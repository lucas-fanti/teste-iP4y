<?php
include '../database/db.php';

if (isset($_GET['id'])) {
    $id = $_GET['id'];

    $stmt = $pdo->prepare("DELETE FROM usuarios WHERE id = ?");
    if ($stmt->execute([$id])) {
        echo "Registro excluído com sucesso!";
    } else {
        echo "Erro ao excluir registro.";
    }
}
?>
