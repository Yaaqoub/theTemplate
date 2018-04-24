let fs = require("fs");
let path = require("path");
let camelCase = require('lodash/camelCase');
let data = {};

module.exports = function(models) {

    let User = models.users;

    fs.readdirSync(path.join(__dirname)).filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    }).forEach(function(file) {
        let prop = camelCase(file.slice(0, -3));
        let Resource = require(`./${file}`);
        this[prop] = Resource;
    });

    User.create(users.admin).then(function() {});

};