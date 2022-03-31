const fs = require("fs")
const users = require("./users.json")
const uuid = require('uuid')

let user = {
    getList: (req, res) => {
        res.json(users)
    },

    createUser: (req, res) => {
        const user = {
            "token": uuid.v4(),
            "nom": req.body.nom,
            "prenom": req.body.prenom,
            "role": req.body.role,
            "created_at": Date.now(),
            "update_at": Date.now()
        }

        var tempUsersList = users;

        tempUsersList ?
            tempUsersList.push(user) :
            tempUsersList = [user];

        const jsonString = JSON.stringify(tempUsersList, null, 2)

        fs.writeFile("./service/users.json", jsonString, err => {
            if (err) {
                console.log('Error writing file', err)
            } else {
                console.log('Successfully wrote file')
            }
        })

        res.json(user)
    },

    updateUser: (req, res) => {
        const tokenUser = req.params.token;

        // read file and make object
        let content = JSON.parse(fs.readFileSync('./service/users.json', 'utf8'));

        for (const obj of content) {
            if (obj.token === tokenUser) {
                req.body.nom ? obj.nom = req.body.nom : null
                req.body.prenom ? obj.prenom = req.body.prenom : null
                req.body.role ? obj.role = req.body.role : null
                obj.updated_at = Date.now()

                break;
            }

            console.log(content);
        }

        const jsonString = JSON.stringify(content, null, 2)

        fs.writeFile("./service/users.json", jsonString, err => {
            if (err) {
                console.log('Error writing file', err)
            } else {
                console.log('Successfully wrote file')
            }
        })

        res.send("User" + tokenUser + " correctement modifié.")
    },

    deleteUser: (req, res) => {
        const tokenUser = req.params.token;

        let usersJSON = JSON.parse(fs.readFileSync('./service/users.json', 'utf8'));

        var index = -1;

        var filteredObj = usersJSON.find(function (item, i) {
            if (item.token === tokenUser) {
                index = i;
                return i;
            }
        });

        usersJSON.splice(index, 1);

        const jsonString = JSON.stringify(usersJSON, null, 2)

        fs.writeFile("./service/users.json", jsonString, err => {
            if (err) {
                console.log('Error writing file', err)
            } else {
                console.log('Successfully wrote file')
            }
        })

        res.send("User" + tokenUser + " correctement supprimé.")
    }
}

module.exports = user;