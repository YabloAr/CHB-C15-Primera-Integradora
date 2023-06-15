//CODERHOUSE BACKEND 43360
//Alumno: Mellyid Salomón
//Primer Entrega Backend.
import express from "express"
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/cart.router.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//router de products
app.use("/api/products", productsRouter)

//router de carts
app.use("/api/carts", cartsRouter)

app.listen(8080, () => console.log("Server up."))