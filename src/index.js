const cors = require("cors");
const express = require("express");
const routes = require("./routes/routes");
const path = require("path");

const app = express();

app.use(express.json());
app.use(cors()); // Certifique-se de que está antes das rotas
app.use(express.static(path.join(__dirname, '..', 'web')));

app.use('/dispositivos', routes);

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'web', 'index.html'));
});

app.get("/", (req, res) => {
    res.send("Welcome to the device cataloging system!");
});

app.listen(3300, () => console.log("Server is running on port 3300"));



