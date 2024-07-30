// Captura os elementos HTML relevantes
const descricaoInput = document.getElementById('descricaoInput2');
const statusSelect = document.getElementById('atualizaStatus');
const select = document.getElementById('atualizaIdUnidade');
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const tombamento1 = params.get("tombamento")

const selectUnidade = getUnidade()

selectUnidade.then(dados => {
    for (const key in dados) {
        select.innerHTML += `<option value="${dados[key].idUnidade}">${dados[key].nomeUnidade}</option>`
    }

})

// Função para executar a atualização do dispositivo
const atualizarDispositivo = (event) => {
    event.preventDefault();
    // Obtém os valores dos campos do formulário
    const tombamento = tombamento1;
    const descricao = descricaoInput.value;
    const idEstado = statusSelect.value;
    const idUnidade = select.value;
    
    // // Verifica se todos os campos obrigatórios foram preenchidos
    // if (!descricao || !idEstado || !idUnidade) {
    //     alert('Por favor, preencha todos os campos obrigatórios.');
    //     return;
    // }
    
    // Chama a função para atualizar o dispositivo na API
    atualizaDisp(tombamento, descricao, idEstado, idUnidade)
    .then(data => {
        // Se a atualização for bem-sucedida, exibe uma mensagem
        console.log('Dispositivo atualizado com sucesso:', data);
        alert('Dispositivo atualizado com sucesso!');
        // Limpa os campos do formulário após a atualização
        descricaoInput.value = '';
        statusSelect.value = '';
        unidadeSelect.value = '';
    })
    .catch(error => {
        // Se ocorrer algum erro na atualização, exibe uma mensagem de erro
        console.error('Erro ao atualizar dispositivo:', error);
        alert('Erro ao atualizar dispositivo. Por favor, tente novamente.');
    });
    
};

// Adiciona um event listener para o botão de atualizar

document.getElementById('atualizar').addEventListener('click', atualizarDispositivo);