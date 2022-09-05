require('./partner')
require('./user');
module.exports = (sequelize, Sequelize) => {
    const Hall = sequelize.define("Hall", 
    {   
        name:{
            type: Sequelize.STRING,
            allowNull: false,
            notEmpty: true
        },
        email:{
            type: Sequelize.STRING,
            allowNull: false,
            notEmpty: true
        },
        description:{
            type: Sequelize.TEXT,
        },
        image_url:{
            type: Sequelize.TEXT,
            defaultValue: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Breezeicons-actions-22-im-user.svg/1200px-Breezeicons-actions-22-im-user.svg.png",
            allowNull: false,
            notEmpty: true
        },
        city:{
            type: Sequelize.TEXT,
            allowNull: false,
        },
        postal_code:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        street:{
            type: Sequelize.STRING,
            allowNull: false
        },
        is_active:{
            type: Sequelize.BOOLEAN,
            allowNull: false,
            notEmpty: true,
            defaultValue: "true"
        },
        UserId:{
            type: Sequelize.INTEGER,
            allowNull:false,
            references: {
                model: "Users",
                key: "id"
            }
        },
        PartnerId:{
            type: Sequelize.INTEGER,
            allowNull:false,
            references: {
                model: "Partners",
                key: "id"
            } 
        }     
    },
    {
        timestamps: false
    }
    );
    return Hall;
};
