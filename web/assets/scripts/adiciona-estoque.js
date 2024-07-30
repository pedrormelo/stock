const cadastraEstoque = (event) => {
    event.preventDefault()

    const idEquip = document.getElementById("selectEquipamento").value
    const quantidade = document.getElementById("quantidade").value

    const cadastrar = adicionaEstoque(idEquip, quantidade);
}

document.getElementById('cadastre').addEventListener('click', cadastraEstoque);