import { Router } from "express";
import productManager from "../productManager.js";

const productsRouter = Router();

productsRouter.get("/", async (req, res) => {
  try {
    const { limit } = req.query;
    const products = await productManager.getProducts();

    if (limit) {
      const limitedProducts = products.slice(0, limit);
      return res.json(limitedProducts);
    }
    return res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).send("ERROR AL INTENTAR RECIBIR LOS PRODUCTOS");
  }
});

productsRouter.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productManager.getProductById(pid);
    if (!product) {
      // ------------------------------
      return res.status(404).json(`PRODUCTO CON ID ${pid} NO ENCONTRADO`); //----------------------
    } // ------------------------------
    return res.json(product); //----------------------------
  } catch (error) {
    console.log(error);
    res.send(`ERROR AL INTENTAR RECIBIR EL PRODUCTO CON ID ${pid}`);
  }
});

productsRouter.post("/", async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      status,
      category,
    } = req.body;
    const response = await productManager.addProduct({
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      status,
      category,
    });
    res.status(201).json(response); // ------------------------------------------------
  } catch (error) {
    console.log(error);
    res.status(500).send(`ERROR AL INTENTAR AGREGAR PRODUCTO`); // ----------------------------------
  }
});

productsRouter.put("/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      status,
      category,
    } = req.body;
    const updateProduct = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      status,
      category,
    }; // ---------------------------------------------------
    const response = await productManager.updateProduct(pid, updateProduct); // ---------------
    res.json(response);
  } catch (error) {
    res.status(500).send(`ERROR AL INTENTAR EDITAR PRODUCTO`);
    console.log(error);
  }
});

productsRouter.delete("/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    await productManager.deleteProduct(pid);
    res.send(`PRODUCTO ELIMINADO EXITOSAMENTE`);
  } catch (error) {
    console.log(error);
    res.status(500).send(`ERROR AL INTENTAR ELIMINAR PRODUCTO CON ID ${pid}`); // ------------------------------
  }
});
export { productsRouter };
