//CODERHOUSE BACKEND 43360
//Segunda Pre-Entrega, Mellyid Salomon.

import fs from "fs"

export default class ProductManager {

    constructor(path) {
        this.path = path
    }

    async getProducts() {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, "utf-8")
                const productsObj = JSON.parse(data)
                // console.log("GET PRODUCTS: ")
                // console.log(productsObj)
                return productsObj
            }
        } catch (error) { console.log(`GP error is ${error.message}`) }

    }

    async addProduct(newProduct) {
        try {
            if (fs.existsSync(this.path)) {

                const data = await fs.promises.readFile(this.path, "utf-8")
                const productsObj = JSON.parse(data)

                let codeCheck = productsObj.some(x => x.code === newProduct.code)
                if (!newProduct.title ||
                    !newProduct.description ||
                    !newProduct.price ||
                    !newProduct.thumbnail ||
                    !newProduct.code ||
                    !newProduct.stock ||
                    codeCheck === true) {
                    // return console.log("ADD PRODUCT: New product is already in DB.")
                } else {
                    // console.log("ADD PRODUCT: New product info is valid.", newProduct.title)
                    newProduct.id = productsObj.length + 1
                    productsObj.push(newProduct)
                    await fs.promises.writeFile(this.path, JSON.stringify(productsObj), null, "\t")
                }
            }
        } catch (error) { console.log(`AP error is ${error.message}`) }
    }

    async getProductById(thisId) {
        try {
            const data = await fs.promises.readFile(this.path, "utf-8")
            const productsObj = JSON.parse(data)
            let foundId = productsObj.find(x => x.id === thisId)
            // console.log(`GET PRODUCT BY ID: Searching for this id: ${thisId}, found product by Id is: ${foundId.title} + ${foundId.description}`)
            if (foundId) {
                return foundId
            } else {
                // console.log("Producto NO ENCONTRADO.")
            }
        } catch (error) { console.log(`GPI error is ${error.message}`) }
    }

    async updateProduct(thisProduct) {
        try {
            const data = await fs.promises.readFile(this.path, "utf-8")
            const productsObj = JSON.parse(data)
            let foundProduct = productsObj.find(x => x.id === thisProduct.id)
            // console.log(foundProduct)
            if (foundProduct ||
                !newProduct.title ||
                !newProduct.description ||
                !newProduct.price ||
                !newProduct.thumbnail ||
                !newProduct.code ||
                !newProduct.stock) {
                // console.log(`UPDATE PRODUCT: Updating ${foundProduct.title + foundProduct.description} with new values.`)
                const foundIndex = productsObj.findIndex(x => x.id === thisProduct.id)
                productsObj[foundIndex] = thisProduct //Needed fix, agregar las validaciones de propiedades previas al write.
                await fs.promises.writeFile(this.path, JSON.stringify(productsObj), null, "\t")
            } else {
                // console.log("UPDATE PRODUCT: Product not found in DB.")
            }
        } catch (error) { console.log(`UP error is ${error.message}`) }
    }

    async deleteProduct(thisId) {
        try {
            const data = await fs.promises.readFile(this.path, "utf-8")
            const productsObj = JSON.parse(data)
            const foundIndex = productsObj.findIndex(x => x.id === thisId)

            if (foundIndex >= 0) {
                // console.log(`DELETE PRODUCT: Deleting ${productsObj[foundIndex].title}.`)
                productsObj.splice(foundIndex, 1)
                await fs.promises.writeFile(this.path, JSON.stringify(productsObj), null, "\t")
            } else {
                // console.log(`DELETE PRODUCT: Product not found.`)
            }
        } catch (error) { console.log(`DP error is ${error.message}`) }
    }
}


