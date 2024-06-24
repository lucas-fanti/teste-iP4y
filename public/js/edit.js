document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('id');

    fetch(`../src/get_user.php?id=${userId}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('id').value = data.id;
            document.getElementById('cpf').value = data.cpf;
            document.getElementById('nome').value = data.nome;
            document.getElementById('sobrenome').value = data.sobrenome;
            document.getElementById('dataNascimento').value = data.data_nascimento;
            document.getElementById('email').value = data.email;
            document.getElementById('genero').value = data.genero;
        })
        .catch(error => console.error('Erro ao carregar os dados do usuário:', error));
});
