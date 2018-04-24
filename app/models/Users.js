module.exports = function(sequelize, Sequelize) {

    let Users = sequelize.define('users', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        username: {
            type: Sequelize.STRING,
            allowNull: false
        },

        password: {
            type: Sequelize.STRING,
            allowNull: false
        },

        last_login: {
            type: Sequelize.DATE
        }
    },{
        underscored: true
    });

    return Users;
}