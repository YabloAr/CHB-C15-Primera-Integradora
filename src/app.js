//CODERHOUSE BACKEND 43360
//PRIMER ENTREGA INTEGRADORA.
//Fecha de entrega: 13/07/2023
//Alumno: Mellyid Salomón

//DEPENDENCIAS
import express from "express"
import __dirname from "./utils.js";
import handlebars from "express-handlebars";
import mongoose from "mongoose";

//Gestores de rutas
import viewsRouter from './routes/views.router.js'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/cart.router.js'

//Definimos el servidor y agregamos el middleware de parseo de las request
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Conexion a mi base de datos de Mongo, mi URL personal.
mongoose.set('strictQuery', false) //corrige error de deprecacion del sistema
const connection = mongoose.connect('mongodb+srv://Yablo:qGz*785_c.Yfwcf@cluster0.hiwmxr5.mongodb.net/ecommerce?retryWrites=true&w=majority')

//Express handlebars
app.engine('handlebars', handlebars.engine()) //habilitamos el uso del motor de plantillas en el servidor.
app.set('views', __dirname + '/views') //declaramos la carpeta con las vistas para las plantillas.
app.set('view engine', 'handlebars') //le decimos a express que use el motor de vistas de handlebars.

//ROUTERS, aqui alojamos los diferentes tipos de request (GET, POST, PUT, DELETE, etc)
app.use('/', viewsRouter) //Definimos la ruta raiz de nuestro proyecto, y las respuestas en vistas con las handlebars.
app.use("/api/products", productsRouter) //router de products
app.use("/api/carts", cartsRouter) //router de carts

const PORT = 8080 //Buena practica, definir una variable con el puerto.
app.listen(PORT, () => console.log("Server up."))