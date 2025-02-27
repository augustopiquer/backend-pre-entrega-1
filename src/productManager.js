import { promises as fs } from "node:fs";
import { v4 as uuidv4 } from "uuid";

class ProductManager {
  constructor() {
    this.path = "products.json";
    this.products = [];
  }

  addProduct = async ({
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    status,
    category,
  }) => {
    const id = uuidv4();

    let newProduct = {
      id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      status,
      category,
    };

    this.products = await this.getProducts();
    this.products.push(newProduct);

    await fs.writeFile(this.path, JSON.stringify(this.products));

    return newProduct;
  };

  getProducts = async () => {
    const response = await fs.readFile(this.path, "utf8");
    const responseJSON = JSON.parse(response);

    return responseJSON;
  };

  getProductById = async (id) => {
    const response = await this.getProducts();

    const product = response.find((product) => product.id == id);

    if (product) {
      return product;
    } else {
      console.log("Producto no encontrado");
    }
  };

  updateProduct = async (id, data) => {
    const products = await this.getProducts();
    const index = products.findIndex((product) => product.id == id);

    if (index != -1) {
      products[index] = { id, ...data };
      await fs.writeFile(this.path, JSON.stringify(products));
      return products[index];
    } else {
      console.log("Producto no encontrado");
    }
  };
  deleteProduct = async (id) => {
    const products = await this.getProducts();
    const index = products.findIndex((product) => product.id == id);

    if (index != -1) {
      products.splice(index, 1);
      await fs.writeFile(this.path, JSON.stringify(products));
    } else {
      console.log("Producto no encontrado");
    }
  };
}

const productManager = new ProductManager();
export default productManager;
