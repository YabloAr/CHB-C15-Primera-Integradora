//CODERHOUSE BACKEND 43360
//Tercera pre-entrega, Servidores Web.

import express from "express"
import ProductManager from "../manager/productManager.js"

const app = express()
const manager = new ProductManager(`../manager/products.json`)

let products = await manager.getProducts()

//getProducts, limite por query.
app.get("/products", (req, res) => {
    let limit = req.query.limit
    if (limit) {
        res.send(products.slice(limit))
    } else {
        res.send(products)
    }
})

//getProductById, por params.
app.get("/products/:pid", (req, res) => {
    let idProducto = parseInt(req.params.pid)
    let producto = products.find(x => x.id === idProducto)
    if (producto) {
        res.send(producto)
    } else {
        res.send({ error: "Producto no encontrado weon turn the fuck back gringo." })
    }
})




app.listen(8080, () => console.log("Server up."))