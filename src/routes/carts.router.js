import { Router } from "express";
import cartManager from "../cartManager.js";

const cartsRouter = Router();

cartsRouter.post("/", async (req, res) => {
  try {
    const response = await cartManager.newCart();
    res.status(201).json(response); // --------------------------------
  } catch (error) {
    res.status(500).send("Error al crear carrito");  // ---------------------
  }
});

cartsRouter.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const response = await cartManager.getCartProducts(cid);
    res.json(response);
  } catch (error) {
    res.status(500).send("Error al intentar enviar los productos del carrito");  // ---------------------
  }
});

cartsRouter.post("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  try {
    await cartManager.addProductToCart(cid, pid);
    res.send("Producto agregado exitosamente");
  } catch (error) {
    res.status(500).send("Error al intentar guardar producto en el carrito");  // ---------------------
  }
});

export { cartsRouter };
