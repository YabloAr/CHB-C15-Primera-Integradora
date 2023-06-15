import { Router } from "express"
import ProductManager from "../services/productManager.js"

//router y manager
const router = Router()
//nota: la ruta del instanciamiento del manager siempre es relativa a app.js
const manager = new ProductManager("./data/products.json")

//-------------------------------------------------------------------------------/API/PRODUCTS

//getProducts asyncrono con limite por query.
router.get("/", async (req, res) => {
    //array de productos
    let products = await manager.getProducts()

    //query limit
    let limit = req.query.limit
    try {
        if (limit) {
            res.send(products.slice(limit))
        } else {
            res.send(products)
        }
    } catch (error) { console.log(`GET Products failed, ${error.message}`) }
})

//getProductById, id por params.
router.get("/:pid", async (req, res) => {
    let idProduct = parseInt(req.params.pid)
    let products = await manager.getProducts()
    let product = products.find(x => x.id === idProduct)
    if (product) {
        res.send(product)
    } else {
        res.send({ error: `GET Product/:pid failed, id not found.` })
    }
})

//addProduct, el manager se encarga de realizar todas las validaciones
router.post(`/`, async (req, res) => {
    const productBody = req.body
    try {
        const addStatus = await manager.addProduct(productBody)
        // console.log("ROUTER POST: addStatus value is:")
        if (addStatus.status === "Ok") {
            console.log("Router Post, ok.")
            res.send({ status: "Ok", message: `Product body (${productBody.title}) pushed to products.` })
        } else {
            console.log("Router Post, failed.")
            res.send(addStatus)
        }
    } catch (error) {
        console.log(`POST Products try failed, catch error is ${error.message}`)
    }
})

//updateProduct, id por params
router.put(`/:pid`, async (req, res) => {
    const productBody = req.body
    let idProduct = parseInt(req.params.pid)
    let products = await manager.getProducts()
    let product = products.find(x => x.id === idProduct)
    // console.log("Product found in router put is")
    // console.log(product)
    if (product) {
        try {
            productBody.id = product.id
            // console.log("ProductBody con id agregado")
            // console.log(productBody)
            const result = await manager.updateProduct(productBody)
            if (result.status === "Ok") {
                res.send({ status: "Ok", message: `Router Put successfull, updated ${productBody.title}` })
            } else {
                res.send(result)
            }
        } catch (error) {
            console.log(`GET Products failed, ${error.message}`)
            res.send({ status: "error", message: "Router Put failed." })
        }
    } else {
        res.send({ status: "Failed", message: `Router Put failed, product id not found in database.` })
    }
})

//deleteProductById, id por params.
router.delete(`/:pid`, async (req, res) => {
    let idProduct = parseInt(req.params.pid)
    console.log(idProduct)
    let products = await manager.getProducts()
    let product = products.find(x => x.id === idProduct)
    if (product) {
        manager.deleteProduct(idProduct)
        res.send({ status: "Ok", message: `Product ${product.title} with id ${product.id} deleted` })
    } else {
        res.send({ error: `Router Delete failed, id not found.` })
    }
})

export default router