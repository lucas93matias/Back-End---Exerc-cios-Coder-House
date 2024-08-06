const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');

const app = express();

// Configuração do Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'src', 'views'));

// Defina a rota raiz para renderizar a página principal
app.get('/', (req, res) => {
    res.render('home', { title: 'Página Principal' });
});

// Iniciando o servidor
app.listen(8080, () => {
    console.log('Servidor ouvindo na porta 8080');
});
