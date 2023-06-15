import { Router } from "express"
import CartManager from "../services/cartManager.js"

//router y manager
const router = Router()
const cartManager = new CartManager("./data/carts.json")

//-------------------------------------------------------------------------------/API/CARTS

//devuelve todos los carritos for testing
router.get("/", async (req, res) => {
    const carts = await cartManager.getCarts()
    res.send(carts)
})

//getCartById, works fine
router.get("/:cid", async (req, res) => {
    const cid = parseInt(req.params.cid)
    const foundCart = await cartManager.getCartById(cid)
    if (foundCart) {
        res.send(foundCart)
    } else {
        res.send({ error: `GET cart/:pid failed, id not found.` })
    }
})

//createCart, si no existe lo crea, si existe suma uno nuevo, works fine
router.post("/", async (req, res) => {
    const carts = await cartManager.createCart()
    res.send({ status: "Ok", message: "New cart added." })
})

//addProductToCart, works fine
router.post("/:cid/products/:pid", async (req, res) => {
    const cid = parseInt(req.params.cid)
    const pid = parseInt(req.params.pid)
    const products = await cartManager.addProductToCart(cid, pid)
    res.send({ status: "Ok", message: `Product added to cart id ${cid}` })
})

export default router
