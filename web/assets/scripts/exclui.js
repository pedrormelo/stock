const excluirDispositivo = (tombamento) => {

    const certeza = confirm("Você tem certeza de que quer excluir o dispositivo? Essa ação não pode ser desfeita.");

    if (certeza === true) { 
        deletaDisp(tombamento)
            .then(response => {
                console.log("Dispositivo excluido!!", response);
            // Você pode adicionar aqui o que deseja fazer após a exclusão do dispositivo
        })
            .catch(error => {
                console.error("Erro ao excluir dispositivo:", error);
            // Você pode adicionar aqui o tratamento de erro adequado
        });
    } else {
        console.log("O usuário cancelou.");
    }
}
