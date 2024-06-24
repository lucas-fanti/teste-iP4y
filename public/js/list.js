document.addEventListener('DOMContentLoaded', function() {
    fetch('../src/list.php')
        .then(response => response.json())
        .then(data => {
            const userTableBody = document.getElementById('userTable').querySelector('tbody');
            userTableBody.innerHTML = '';

            data.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.cpf}</td>
                    <td>${user.nome}</td>
                    <td>${user.sobrenome}</td>
                    <td>${user.data_nascimento}</td>
                    <td>${user.email}</td>
                    <td>${user.genero}</td>
                    <td>
                        <button onclick="editarRegistro(${user.id})">Editar</button>
                        <button onclick="excluirRegistro(${user.id})">Excluir</button>
                    </td>
                `;
                userTableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Erro ao carregar a lista de usuários:', error));
});

function editarRegistro(id) {
    window.location.href = `edit.html?id=${id}`;
}

function excluirRegistro(id) {
    if (confirm('Você tem certeza que deseja excluir este registro?')) {
        fetch(`../src/delete_user.php?id=${id}`)
            .then(response => response.text())
            .then(data => {
                alert(data);
                window.location.reload();
            })
            .catch(error => console.error('Erro ao excluir o registro:', error));
    }
}
