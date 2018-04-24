module.exports = function(sequelize, Sequelize) {

    let Content = sequelize.define('content', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        data_name: {
            type: Sequelize.STRING,
            allowNull: false
        },

        data_description: {
            type: Sequelize.STRING,
            allowNull: false
        },

        website_image: {
            type: Sequelize.STRING,
            allowNull: false
        },

        facebook_image: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },{
        underscored: true
    });

    return Content;
}