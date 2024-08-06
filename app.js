const express = require('express');
const { generateToken, authToken } = require('./src/utils.js');
const User = require('./src/models/User.js');

const app = express();
app.use(express.json());

app.post('/register', async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;
    try {
        const exist = await User.findOne({ email });
        if (exist) {
            return res.status(400).send({ status: "Erro", erro: "Usuário já existe" });
        }
        const user = new User({ first_name, last_name, email, age, password });
        await user.save();
        const access_token = generateToken(user);
        res.send({ status: "Sucesso", access_token });
    } catch (err) {
        res.status(500).send({ status: "Erro", erro: err.message });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(400).send({ status: "Erro", erro: "Credenciais inválidas" });
        }
        const access_token = generateToken(user);
        res.send({ status: "Sucesso", access_token });
    } catch (err) {
        res.status(500).send({ status: "Erro", erro: err.message });
    }
});

app.get('/current', authToken, (req, res) => {
    res.send({ status: "Sucesso", payload: req.user });
});

app.listen(8080, () => console.log('Servidor ouvindo na porta 8080'));
