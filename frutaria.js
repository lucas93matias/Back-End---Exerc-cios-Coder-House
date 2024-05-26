// Importando os módulos necessários
const express = require('express');
const fs = require('fs').promises;

// Criando uma instância do Express
const app = express();
const PORT = process.env.PORT || 3000;

// Classe para gerenciar os produtos
class ProductManager {
  constructor(filePath) {
    this.filePath = filePath;
  }

  // Método para ler os produtos do arquivo
  async getProducts() {
    try {
      const data = await fs.readFile(this.filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Erro ao ler o arquivo de produtos:', error);
      return [];
    }
  }

  // Método para obter um único produto por ID
  async getProductById(productId) {
    try {
      const products = await this.getProducts();
      return products.find(product => product.id === productId);
    } catch (error) {
      console.error('Erro ao obter produto por ID:', error);
      return null;
    }
  }
}

// Instanciando o gerenciador de produtos com o arquivo de frutas
const productManager = new ProductManager('frutas.json');

// Rota para obter todos os produtos
app.get('/products', async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
    const products = await productManager.getProducts();
    const result = limit ? products.slice(0, limit) : products;
    res.json(result);
  } catch (error) {
    console.error('Erro ao obter todos os produtos:', error);
    res.status(500).send('Erro ao buscar produtos.');
  }
});

// Rota para obter um produto por ID
app.get('/products/:pid', async (req, res) => {
  try {
    const productId = req.params.pid;
    const product = await productManager.getProductById(productId);
    if (product) {
      res.json(product);
    } else {
      res.status(404).send('Produto não encontrado.');
    }
  } catch (error) {
    console.error('Erro ao obter produto por ID:', error);
    res.status(500).send('Erro ao buscar produto.');
  }
});

console.log('O arquivo frutaria.js está sendo executado.');

// Seu código continua aqui...


// Iniciando o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
