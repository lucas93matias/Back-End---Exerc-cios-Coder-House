class ProductManager {
    constructor() {
    this.products = []; // onde eu armazeno os produtos
    this.productIdCounter = 1 // contador para cada ID que vou criar
}

// onde vou add um produto novo
addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !thumbnail || !code || !stock) {
        console.error('Todos os campos são obrigatórios!');
        return;
    }

    if (this.products.some(product => product.code === code)){
        console.error('O código do produto já existe.');
        return;
    }

    const newProduct = {
        id: this.productIdCounter++,
        title,
        description,
        price,
        thumbnail,
        code,
        stock
    };
    this.products.push(newProduct);
    console.log('Produto adicionado com sucesso:', newProduct);
}

getProductById(id) {
    const product = this.products.find(product => product.id === id);
    if (!product) {
        console.error('Produto não encontrado.');
    } else {
        console.log('Produto encontrado:', product);
       }
       return product;
    }
}

const productManager = new ProductManager();
productManager.addProduct('Ingresso', 'Alice in Chains', 199.90, 'pasta/da/imagem.jpg', '1AIC', 20);
productManager.addProduct('Ingresso', 'Iron Maiden', 499.90,'pasta/da/imagem2.jpg', '2IM', 200);
productManager.addProduct('Ingresso', 'Coritiba', 99.99, 'locais/da/imagem.jpg', '3COR', 10);
console.log(productManager);

