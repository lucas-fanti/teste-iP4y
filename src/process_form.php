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
    $cpf = preg_replace('/[^0-9]/', '', $_POST['cpf']); // Remover caracteres não numéricos do CPF
    $nome = $_POST['nome'];
    $sobrenome = $_POST['sobrenome'];
    $data_nascimento = $_POST['dataNascimento'];
    $email = $_POST['email'];
    $genero = $_POST['genero'];

    if (validarCPF($cpf)) {
        $stmt = $pdo->prepare("INSERT INTO usuarios (cpf, nome, sobrenome, data_nascimento, email, genero) VALUES (?, ?, ?, ?, ?, ?)");
        
        //echo $cpf . '-' . $nome . '-' . $sobrenome . '-' . $data_nascimento . '-' . $email . '-' . $genero;
        
        if ($stmt->execute([$cpf, $nome, $sobrenome, $data_nascimento, $email, $genero])) {
            echo "Registro inserido com sucesso!";
        } else {
            echo "Erro ao inserir registro.";
        }
    } else {
        echo "CPF inválido.";
    }
}
?>
