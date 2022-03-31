const { use } = require("express/lib/application");
let properties = require("../package.json");

let user = require("../service/user");
let product = require("../service/product")

let controllers = {
    getUsers: function (req, res) {
        user.getList(req, res, function (err, user) {
            if (err)
                res.send(err);
            res.json(user); 
        });
    },

    createUser: function (req, res) {
        user.createUser(req, res, function (err, user) {
            if (err)
                res.send(err);
            res.json(user); 
        });
    }, 

    updateUser: function (req, res) { 
        user.updateUser(req, res, function (err, user) {
            if (err)
                res.send(err);
            res.json(user); 
        });
    }, 

    deleteUser: function (req,res) {
        user.deleteUser(req, res, function (err, user) {
            if (err)
                res.send(err);
            res.json(user); 
        });
    },

    getProducts: function (req, res) {
        product.getList(req, res, function (err, user) {
            if (err)
                res.send(err);
            res.json(user); 
        });
    },

    createProduct: function (req, res) {
        product.createProduct(req, res, function (err, user) {
            if (err)
                res.send(err);
            res.json(user); 
        });
    }, 

    updateProduct: function (req, res) { 
        product.updateProduct(req, res, function (err, user) {
            if (err)
                res.send(err);
            res.json(user); 
        });
    }, 

    deleteProduct: function (req,res) {
        product.deleteProduct(req, res, function (err, user) {
            if (err)
                res.send(err);
            res.json(user); 
        });
    }

};

module.exports = controllers;