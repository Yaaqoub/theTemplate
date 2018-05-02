module.exports = function(sequelize, Sequelize) {

    let Configurations = sequelize.define('configurations', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        website_name: {
            type: Sequelize.STRING,
            allowNull: false
        },

        website_title: {
            type: Sequelize.STRING,
            allowNull: false
        },

        website_email: {
            type: Sequelize.STRING,
            allowNull: false
        },

        website_description: {
            type: Sequelize.STRING,
            allowNull: false
        },

        website_keywords: {
            type: Sequelize.STRING,
            allowNull: false
        },

        Copyright: {
            type: Sequelize.STRING,
            allowNull: false
        },

        city_country: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },{
        underscored: true
    });

    return Configurations;
}