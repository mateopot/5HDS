const fs = require("fs")
const products = require("./products.json")
const uuid = require('uuid')

let product = {
    getList: (req, res) => {
        res.json(products)
    },

    createProduct: (req, res) => {
        const product = {
            "token": uuid.v4(),
            "nom": req.body.nom,
            "description": req.body.description,
            "prix": req.body.prix,
            "stock": req.body.stock,
            "reference": req.body.reference,
            "created_at": Date.now(),
            "update_at": Date.now()
        }

        var tempProductsList = products;

        tempProductsList ?
            tempProductsList.push(product) :
            tempProductsList = [product];

        const jsonString = JSON.stringify(tempProductsList, null, 2)

        fs.writeFile("./service/products.json", jsonString, err => {
            if (err) {
                console.log('Error writing file', err)
            } else {
                console.log('Successfully wrote file')
            }
        })

        res.json(product)
    },

    updateProduct: (req, res) => {
        const tokenProduct = req.params.token;

        // read file and make object
        let content = JSON.parse(fs.readFileSync('./service/products.json', 'utf8'));

        for (const obj of content) {
            if (obj.token === tokenProduct) {
                req.body.nom ? obj.nom = req.body.nom : null
                req.body.prix ? obj.prix = req.body.prix : null
                req.body.reference ? obj.reference = req.body.reference : null
                req.body.stock ? obj.stock = req.body.stock : null
                req.body.description ? obj.description = req.body.description : null
                obj.updated_at = Date.now()

                break;
            }

            console.log(content);
        }

        const jsonString = JSON.stringify(content, null, 2)

        fs.writeFile("./service/products.json", jsonString, err => {
            if (err) {
                console.log('Error writing file', err)
            } else {
                console.log('Successfully wrote file')
            }
        })

        res.send("Product" + tokenProduct + " correctement modifié.")
    },

    deleteProduct: (req, res) => {
        const tokenProduct = req.params.token;

        let productsJSON = JSON.parse(fs.readFileSync('./service/products.json', 'utf8'));

        var index = -1;

        var filteredObj = productsJSON.find(function (item, i) {
            if (item.token === tokenProduct) {
                index = i;
                return i;
            }
        });

        productsJSON.splice(index, 1);

        const jsonString = JSON.stringify(productsJSON, null, 2)

        fs.writeFile("./service/products.json", jsonString, err => {
            if (err) {
                console.log('Error writing file', err)
            } else {
                console.log('Successfully wrote file')
            }
        })

        res.send("Product" + tokenProduct + " correctement supprimé.")
    }
}

module.exports = product;