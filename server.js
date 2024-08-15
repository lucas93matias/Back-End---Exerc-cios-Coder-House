const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Middlewares da aplicação
app.use(bodyParser.json());

// Onde importo as rotas
const toyRoutes = require('./routes/toy.routes');  // Sempre preciso confdirmar se o caminho está correto

// Usando as rotas
app.use('/api', toyRoutes);

// Onde conecto ao MongoDB
mongoose.connect('mongodb://localhost/toyshop', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Conectado ao MongoDB');
}).catch((err) => {
    console.error('Erro ao conectar ao MongoDB', err);
});

// Inicializa o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
