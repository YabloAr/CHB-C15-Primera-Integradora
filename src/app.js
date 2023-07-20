//CODERHOUSE BACKEND 43360
//PRIMER ENTREGA INTEGRADORA.
//Fecha de entrega: 13/07/2023
//Alumno: Mellyid Salomón

//DEPENDENCIAS
import express from "express"
import __dirname from "./utils.js";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import { Server } from 'socket.io'

//Gestores de rutas
import viewsRouter from './routes/views.router.js'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/cart.router.js'

//Importo el message manager
import messageManager from "./dao/dbManagers/messagesManager.js";

//Definimos el servidor y agregamos el middleware de parseo de las request
const PORT = 8080 //Buena practica, definir una variable con el puerto.
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//ServerUp
const httpserver = app.listen(PORT, () => console.log("Server up."))


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

//Aplicacion chat con socket.io
app.use(express.static(__dirname + '/public')) //en el js pasa la magia.
const io = new Server(httpserver) //Declaramos el servidor http dentro del server para express para socket.io

let messages = [] //esta sera la coleccion de objetos.

//.on = escuchar/recibir
//Cuando hay una nueva connection,
//queda a la escucha permanente con esa conexion.
io.on('connection', socket => {
    console.log("App.js Chat: New client connected.")

    //el socket espera algun 'message' desde el cliente (index.js), data llega como objeto, {user: x, message: x}
    socket.on('message', async data => {
        messages.push(data)
        io.emit('messageLogs', messages) //envia al cliente un 'messageLogs', con el array completo de mensajes.
        try {
            await messageManager.saveMessage(data)
        } catch (error) { return { status: 'error', message: `app.js saving messages failed. ${error.message}` } }
    })
})

