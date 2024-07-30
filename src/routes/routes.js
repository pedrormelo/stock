const express = require('express');
const connect = require('../db/connect.js'); // Corrigido para refletir a estrutura correta


const router = express.Router();

router.get('/', (req, res) => {
    const { idUnidade, idEstado } = req.query;

    let query = "SELECT * FROM dispositivos";

    const conditions = [];

    if (idUnidade) {
        conditions.push(`idUnidade = ${idUnidade}`);
    }

    if (idEstado) {
        conditions.push(`idEstado = ${idEstado}`);
    }

    if (conditions.length > 0) {
        query += ` WHERE ${conditions.join(' AND ')}`;
    }

    connect.query(query, (err, rows) => {
        if (err) {
            console.error("Erro ao obter dispositivos:", err);
            res.status(500).json({ error: "Erro interno do servidor" });
            return;
        }
        res.json(rows);
    });
});


//ROTA PARA POR tipos NO SELECT
router.get('/tipodisp', (req,res) => {
    connect.query("SELECT * FROM tipodisp", (err, result) => {
        if (err) {
            console.error("Erro ao obter o Tipo:", err);
            res.status(500).json({ error: "Erro interno do servidor" });
            return;
        }
        if (result.length === 0) {
            res.status(404).json({ error: "Tipo não encontrado" });
            return;
        }
        res.json(result);
    })
})

//ROTA PARA POR UNIDADES NO SELECT
router.get('/unidades', (req,res) => {
    connect.query("SELECT * FROM unidade", (err, result) => {
        if (err) {
            console.error("Erro ao obter o unidade:", err);
            res.status(500).json({ error: "Erro interno do servidor" });
            return;
        }
        if (result.length === 0) {
            res.status(404).json({ error: "Unidade não encontrado" });
            return;
        }
        res.json(result);
    })
})

//rota louca
router.get('/dispositivos/:tombamento', (req, res) => {
    const { tombamento } = req.params;

    connect.query(`SELECT * FROM dispositivos WHERE tombamento LIKE '${tombamento}%'`, (err, result) => {
        if (err) {
            console.error("Erro ao obter o dispositivo pelo tombamento:", err);
            res.status(500).json({ error: "Erro interno do servidor" });
            return;
        }
        if (result.length === 0) {
            res.status(404).json({ error: "Dispositivo não encontrado" });
            return;
        }
        res.json(result); // Retorna os dispositivos encontrados com o tombamento especificado
    });
});



// ----------------------------------------------------------

// Rota para adicionar um novo dispositivo
router.post('/', (req, res) => {
    const { tombamento, descricao, idEstado, idUnidade, idTipo } = req.body;
    connect.query("INSERT INTO dispositivos (tombamento, descricao, idEstado, idUnidade, idTipo) VALUES (?, ?, ?, ?, ?)", [tombamento, descricao, idEstado, idUnidade, idTipo], (err, result) => {
        if (err) {
            console.error("Erro ao adicionar dispositivo:", err);
            res.status(500).json({ error: "Erro interno do servidor" });
            return;
        }
        res.status(201).json({ message: "Dispositivo adicionado com sucesso", id: result.insertId });
    });
});

// Rota para atualizar um dispositivo existente
router.put('/:tombamento', (req, res) => {
    const { tombamento } = req.params;
    const { descricao, idEstado, idUnidade } = req.body;
    connect.query(`UPDATE dispositivos SET descricao = '${descricao}', idEstado = '${idEstado}', idUnidade = '${idUnidade}' WHERE tombamento = '${tombamento}'`, (err, result) => {
        if (err) {
            console.error("Erro ao atualizar o dispositivo:", err);
            res.status(500).json({ error: "Erro interno do servidor" });
            return;
        }
        res.json({ message: "Dispositivo atualizado com sucesso" });
    });
});

// Rota para excluir um dispositivo
router.delete('/:tombamento', (req, res) => {
    const { tombamento } = req.params;
    connect.query(`DELETE FROM dispositivos WHERE tombamento = '${tombamento}'`, (err, result) => {
        if (err) {
            console.error("Erro ao excluir o dispositivo:", err);
            res.status(500).json({ error: "Erro interno do servidor" });
            return;
        }
        res.json({ message: "Dispositivo excluído com sucesso" });
    });
});

//rota para pegar STATUS
router.get('/estado', (req, res) => {
    connect.query("SELECT * FROM estado", (err, result) => {
        if (err) {
            console.error("Erro ao obter status:", err);
            res.status(500).json({ error: "Erro interno do servidor" });
            return;
        }
        if (result.length === 0) {
            res.status(404).json({ error: "Status não encontrado" });
            return;
        }
        res.json(result);
    })
})




//rota para pegar itens equipamento
router.get('/equipamentos', (req, res) => {
    connect.query("SELECT * FROM equipamentos", (err, result) => {
        if (err) {
            console.error("Erro ao obter equipamentos:", err);
            res.status(500).json({ error: "Erro interno do servidor" });
            return;
        }
        if (result.length === 0) {
            res.status(404).json({ error: "Equipamentos não encontrados" });
            return;
        }
        res.json(result);
    })
})

//rota para pegar estoque
router.get('/estoque', (req, res) => {
    connect.query("SELECT * FROM estoque", (err, result) => {
        if (err) {
            console.error("Erro ao obter estoque:", err);
            res.status(500).json({ error: "Erro interno do servidor" });
            return;
        }
        if (result.length === 0) {
            res.status(404).json({ error: "Estoque não encontrado" });
            return;
        }
        res.json(result);
    })
})


// Rota para adicionar um novo equipamento
router.post('/equipamentos', (req, res) => {
    const { idEquip, nomeEquip } = req.body;
    connect.query(`INSERT INTO equipamentos (idEquip, nomeEquip) VALUES ('${idEquip}', '${nomeEquip}')`, (err, result) => {
        if (err) {
            console.error("Erro ao adicionar equipamento:", err);
            res.status(500).json({ error: "Erro interno do servidor" });
            return;
        }
        res.status(201).json({ message: "equipamento adicionado com sucesso", id: result.insertId });
    });
});

router.post('/estoque', (req, res) => {
    const { idEquip, quantidade } = req.body; // Recebe o ID do equipamento e a quantidade especificada pelo usuário

    // Itera sobre a quantidade especificada
    for (let i = 0; i < quantidade; i++) {
        // Insere o item de estoque no banco de dados
        connect.query(`INSERT INTO estoque (idEquip) VALUES ('${idEquip}')`, (err, result) => {
            if (err) {
                console.error("Erro ao adicionar item de estoque:", err);
                res.status(500).json({ error: "Erro interno do servidor" });
                return;
            }
        });
    }

    res.status(201).json({ message: "Itens de estoque adicionados com sucesso" });
});

// Rota para excluir itens de estoque
router.delete('/estoque/:id', (req, res) => {
    const { idEquip, quantidade } = req.body; // Recebe o ID do equipamento e a quantidade especificada pelo usuário
    // Exclui a quantidade especificada de itens de estoque
    connect.query(`DELETE FROM estoque WHERE idEquip = '${req.params.id}' LIMIT ${quantidade}`, (err, result) => {
        if (err) {
            console.error("Erro ao excluir item(s) de estoque:", err);
            res.status(500).json({ error: "Erro interno do servidor" });
            return;
        }
        res.status(200).json({ message: `${result.affectedRows} item(s) de estoque excluído(s) com sucesso` });
    });
});

// Rota para excluir equipamentos
router.delete('/equipamentos/:idEquip', (req, res) => {
    const { idEquip } = req.params;

    connect.query(`DELETE FROM equipamentos WHERE idEquip = '${idEquip}'`, (err, result) => {
        if (err) {
            console.error("Erro ao excluir o equipamento:", err);
            res.status(500).json({ error: "Erro interno do servidor" });
            return;
        }
        res.status(200).json(result);
    });
});

router.get('/estoque/:idEquip', (req, res) => {
    const { idEquip } = req.params;
    connect.query(`SELECT * FROM estoque WHERE idEquip = ${idEquip}`, (err, rows) => {
        if (err) {
            console.error("Erro ao obter dispositivos:", err);
            res.status(500).json({ error: "Erro interno do servidor" });
            return;
        }
        res.status(200).json(rows);
    });
});


module.exports = router;

