document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let valid = true;

    // Validação CPF
    const cpf = document.getElementById('cpf').value;
    if (!validarCPF(cpf)) {
        valid = false;
        document.getElementById('cpfError').style.display = 'inline';
    } else {
        document.getElementById('cpfError').style.display = 'none';
    }

    // Validação Nome
    const nome = document.getElementById('nome').value;
    if (nome.trim() === '') {
        valid = false;
        document.getElementById('nomeError').style.display = 'inline';
    } else {
        document.getElementById('nomeError').style.display = 'none';
    }

    // Validação Sobrenome
    const sobrenome = document.getElementById('sobrenome').value;
    if (sobrenome.trim() === '') {
        valid = false;
        document.getElementById('sobrenomeError').style.display = 'inline';
    } else {
        document.getElementById('sobrenomeError').style.display = 'none';
    }

    // Validação Data de Nascimento
    const dataNascimento = document.getElementById('dataNascimento').value;
    if (!validarData(dataNascimento)) {
        valid = false;
        document.getElementById('dataNascimentoError').style.display = 'inline';
    } else {
        document.getElementById('dataNascimentoError').style.display = 'none';
    }

    // Validação E-mail
    const email = document.getElementById('email').value;
    if (!validarEmail(email)) {
        valid = false;
        document.getElementById('emailError').style.display = 'inline';
    } else {
        document.getElementById('emailError').style.display = 'none';
    }

    // Validação Gênero
    const genero = document.getElementById('genero').value;
    if (genero === '') {
        valid = false;
        document.getElementById('generoError').style.display = 'inline';
    } else {
        document.getElementById('generoError').style.display = 'none';
    }

    if (valid) {
        this.submit();
    }
});

function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');

    if (cpf.length !== 11) return false;

    if (cpf === "00000000000" || cpf === "11111111111" || cpf === "22222222222" || cpf === "33333333333" ||
        cpf === "44444444444" || cpf === "55555555555" || cpf === "66666666666" || cpf === "77777777777" ||
        cpf === "88888888888" || cpf === "99999999999")
        return false;

    let add = 0;
    for (let i = 0; i < 9; i++)
        add += parseInt(cpf.charAt(i)) * (10 - i);
    let rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(cpf.charAt(9))) return false;

    add = 0;
    for (let i = 0; i < 10; i++)
        add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(cpf.charAt(10))) return false;

    return true;
}

function validarData(data) {
    const dataNascimento = new Date(data);
    const hoje = new Date();
    console.log(hoje);
    return dataNascimento <= hoje;
}

function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}
