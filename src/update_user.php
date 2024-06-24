<?php
include '../database/db.php';

function validarCPF($cpf) {
    // Remover caracteres não numéricos
    $cpf = preg_replace('/[^0-9]/', '', $cpf);

    if (strlen($cpf) != 11) return false;

    if ($cpf == '00000000000' || $cpf == '11111111111' || $cpf == '22222222222' || $cpf == '33333333333' ||
        $cpf == '44444444444' || $cpf == '55555555555' || $cpf == '66666666666' || $cpf == '77777777777' ||
        $cpf == '88888888888' || $cpf == '99999999999')
        return false;

    for ($t = 9; $t < 11; $t++) {
        for ($d = 0, $c = 0; $c < $t; $c++) {
            $d += $cpf[$c] * (($t + 1) - $c);
        }
        $d = ((10 * $d) % 11) % 10;
        if ($cpf[$c] != $d) {
            return false;
        }
    }
    return true;
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id = $_POST['id'];
    $cpf = preg_replace('/[^0-9]/', '', $_POST['cpf']); // Remover caracteres não numéricos do CPF
    $nome = $_POST['nome'];
    $sobrenome = $_POST['sobrenome'];
    $data_nascimento = $_POST['dataNascimento'];
    $email = $_POST['email'];
    $genero = $_POST['genero'];

    // Validações de tamanho
    if (strlen($cpf) != 11) {
        die("Erro: O CPF deve ter exatamente 11 caracteres.");
    }
    if (strlen($nome) > 50) {
        die("Erro: O nome deve ter no máximo 50 caracteres.");
    }
    if (strlen($sobrenome) > 50) {
        die("Erro: O sobrenome deve ter no máximo 50 caracteres.");
    }
    if (strlen($email) > 100) {
        die("Erro: O e-mail deve ter no máximo 100 caracteres.");
    }
    if (strlen($genero) > 10) {
        die("Erro: O gênero deve ter no máximo 10 caracteres.");
    }

    // Validação de CPF
    if (!validarCPF($cpf)) {
        die("Erro: CPF inválido.");
    }

    try {
        $stmt = $pdo->prepare("UPDATE usuarios SET cpf = ?, nome = ?, sobrenome = ?, data_nascimento = ?, email = ?, genero = ? WHERE id = ?");
        if ($stmt->execute([$cpf, $nome, $sobrenome, $data_nascimento, $email, $genero, $id])) {
            echo "Registro atualizado com sucesso!";
        } else {
            echo "Erro ao atualizar registro.";
        }
    } catch (PDOException $e) {
        die("Erro na conexão: " . $e->getMessage());
    }
}
?>
