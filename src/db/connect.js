const mysql = require("mysql2");

let connection;

function handleDisconnect() {
    connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "db1",
        connectTimeout: 60000,
        // Configura��o de keep-alive
        enableKeepAlive: true,
        keepAliveInitialDelay: 60000
    });

    connection.connect((err) => {
        if (err) {
            console.log("Erro ao conectar ao banco de dados:", err);
            setTimeout(handleDisconnect, 2000); // Tenta reconectar ap�s 2 segundos
        } else {
            console.log("Conectou");
        }
    });

    connection.on('error', (err) => {
        console.log('Erro de conex�o ao banco de dados:', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect(); // Reconecta se a conex�o foi perdida
        } else {
            throw err;
        }
    });
}

handleDisconnect();

// Fun��o para manter a conex�o ativa
setInterval(() => {
    connection.ping((err) => {
        if (err) {
            console.log('Erro ao enviar ping ao banco de dados:', err);
        } else {
            console.log('Ping enviado com sucesso');
        }
    });
}, 300000); // Envia ping a cada 5 minutos

module.exports = connection;
