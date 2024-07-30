const baseUrl = "http://10.87.20.2:3300"

const consultarDisp = (filtros) => {
    let url = `${baseUrl}/dispositivos`;
    // Se houver filtros, adiciona à URL
    if (filtros) {
        // Verifica se há um tombamento na consulta
        if (filtros.tombamento) {
            url += `/dispositivos/${filtros.tombamento}`; // Adiciona o tombamento à URL
        } else {
            url += '?' + Object.keys(filtros).map(key => `${key}=${filtros[key]}`).join('&');
        }
    }

    return fetch(url, { method: "GET" })
        .then(res => res.json())
        .then(res => res);
}


const adicionaDisp = (tombamento, descricao, idEstado, idUnidade, idTipo) => {
    const data = {tombamento, descricao, idEstado, idUnidade, idTipo}
    const body = JSON.stringify(data)
    fetch(`${baseUrl}/dispositivos`,
    {
        method: 'POST',
        headers: 
        {
        'Content-Type': 'application/json'
        },
        body
    })
    return "ok!"
}

//atualizar dispositivo
const atualizaDisp = (tombamento, descricao, idEstado, idUnidade) => {
    const info = { descricao, idEstado:Number(idEstado), idUnidade:Number(idUnidade)};

    return fetch(`${baseUrl}/dispositivos/${tombamento}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(info)
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Erro ao atualizar dispositivo');
        }
        return res.json();
    })
    .then(data => data)
    .catch(error => console.error('Erro:', error));
}


const deletaDisp = (tombamento) => {
    return fetch(`${baseUrl}/dispositivos/${tombamento}`, {
        method: "DELETE",
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Erro ao excluir dispositivo');
        }
        return res.json();
    })
    .then(data => data)
    .catch(error => console.error('Erro:', error));
}

const getUnidade = () => {
    return fetch(`${baseUrl}/dispositivos/unidades`, {   
        method: "GET",
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Erro ao achar unidade');
        }
        return res.json();
    })
    .then(data => data)
    .catch(error => console.log('Erro', error));
}

const getTipo = () => {
    return fetch(`${baseUrl}/dispositivos/tipodisp`, {   
        method: "GET",
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Erro ao achar tipo');
        }
        return res.json();
    })
    .then(data => data)
    .catch(error => console.log('Erro', error));
}

const getStatus = () => {
    return fetch(`${baseUrl}/dispositivos/estado`, {   
        method: "GET",
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Erro ao achar estado');
        }
        return res.json();
    })
    .then(data => data)
    .catch(error => console.log('Erro', error));
}

const getEquipamentos = () => {
    return fetch(`${baseUrl}/dispositivos/equipamentos`, {
        method: "GET",
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Erro ao procurar equipamento');
        }
        return res.json();
    })
    .then(data => data)
    .catch(error => console.log('Erro', error));
}

const getEstoque = () => {
    return fetch(`${baseUrl}/dispositivos/estoque`, {
        method: "GET",
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Erro ao buscar estoque');
        }
        return res.json();
    })
    .then(data => data)
    .catch(error => console.log('Erro', error));
}


const getIdEstoque = (idEquip) => {
    let url = `${baseUrl}/dispositivos/estoque/${idEquip}`
    // Se houver filtros, adiciona à URL
    return fetch(url, { method: "GET" })
    .then(res => {
        if (!res.ok) {
            throw new Error('Erro ao buscar estoque');
        }
        return res.json();
    })
    .then(data => data)
    .catch(error => console.log('Erro', error));
}

const getEquip = () => {
    return fetch(`${baseUrl}/dispositivos/estoque`, {
        method: "GET",
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Erro ao buscar equipamento no estoque');
        }
        return res.json();
    })
    .then(data => data)
    .catch(error => console.log('Erro', error));
}

const deletaEquip = (idEquip, event) => {
    fetch(`${baseUrl}/dispositivos/equipamentos/${idEquip}`, {
        method: "DELETE",
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Erro ao excluir dispositivo');
        }
        return res.json();
    })
    .then(data => data)
    .catch(error => console.error('Erro:', error));
}

const adicionaEquip = (idEquip, nomeEquip) => {
    const data = {idEquip, nomeEquip}
    const body = JSON.stringify(data)
    fetch(`${baseUrl}/dispositivos/equipamentos`,
    {
        method: 'POST',
        headers: 
        {
        'Content-Type': 'application/json'
        },
        body
    })
    return "ok!"
}

const adicionaEstoque = (idEquip, quantidade) => {
    const body = JSON.stringify({ idEquip, quantidade }); // Envia o ID do equipamento e a quantidade
    return fetch(`${baseUrl}/dispositivos/estoque`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao adicionar itens de estoque');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        return "ok!";
    })
    .catch(error => {
        console.error(error);
        return "Erro ao adicionar itens de estoque";
    });
}

const deletaEstoque = (idEquip, quantidade) => {
    const body = JSON.stringify({ quantidade }); // Envia o ID do equipamento e a quantidade
    return fetch(`${baseUrl}/dispositivos/estoque/${idEquip}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao excluir itens de estoque');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        return "ok!";
    })
    .catch(error => {
        console.error(error);
        return "Erro ao excluir itens de estoque";
    });
}

