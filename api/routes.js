const controller = require("./controller");

module.exports = function (myApp) {
    myApp.route("/getUsers")
        .get(controller.getUsers);
    myApp.route("/createUser")
        .post(controller.createUser);
    myApp.route("/updateUser/:token")
        .post(controller.updateUser);
    myApp.route("/deleteUser/:token")
        .post(controller.deleteUser);
    myApp.route("/getProducts")
        .get(controller.getProducts);
    myApp.route("/createProduct")
        .post(controller.createProduct);
    myApp.route("/updateProduct/:token")
        .post(controller.updateProduct);
    myApp.route("/deleteProduct/:token")
        .post(controller.deleteProduct);
};