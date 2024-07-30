const excluiEquip = (event, idEquip) => {
    event.preventDefault()
    console.log(idEquip);

    deletaEquip(idEquip)
    .catch(error => {
        console.error("Erro ao excluir item:", error);
        // Você pode adicionar aqui o tratamento de erro adequado
    });
}



