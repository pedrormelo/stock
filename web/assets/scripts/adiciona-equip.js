const adicionaEquipamento = (event) => {
    event.preventDefault()

    const idEquip = document.getElementById('idEquip').value;
    const nomeEquip = document.getElementById('nomeEquipamento').value;


    const adicionar = adicionaEquip(idEquip, nomeEquip);
}

document.getElementById('adicionar').addEventListener('click', adicionaEquipamento);