document.getElementById('sendDataButton').addEventListener('click', function() {
    fetch('../src/list.php')
        .then(response => response.json())
        .then(data => {
            const jsonData = JSON.stringify(data);
            console.log(jsonData);

            fetch('https://api-teste.ip4y.com.br/cadastro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: jsonData
            })
            .then(response => response.json())
            .then(result => {
                console.log('Sucesso:', result);
                alert('Dados enviados para a API com sucesso!');
            })
            .catch(error => {
                console.error('Erro ao enviar os dados:', error);
                alert('Erro ao enviar os dados para a API.');
            });
        })
        .catch(error => console.error('Erro ao carregar a lista de usuários:', error));
});
