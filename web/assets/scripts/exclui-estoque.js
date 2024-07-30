const excluiEstoque = (event) => {
    event.preventDefault()

    const idEquip = document.getElementById('selectEquipamento').value;
    let quantidade = document.getElementById('quantidade').value;
    
    // Validação da entrada do usuário: Garante que a quantidade seja um número inteiro positivo
    quantidade = parseInt(quantidade);
    if (isNaN(quantidade) || quantidade <= 0) {
        console.error("A quantidade especificada não é válida");
        return;
    }
    
    deletaEstoque(idEquip, quantidade)
    .then(response => {
        console.log(`${quantidade} item(s) excluído(s) do estoque!!`, response);
        // Você pode adicionar aqui o que deseja fazer após a exclusão do item de estoque
    })
    .catch(error => {
        console.error("Erro ao excluir item:", error);
        // Você pode adicionar aqui o tratamento de erro adequado
    });
}

document.getElementById('excluir').addEventListener('click', excluiEstoque);


