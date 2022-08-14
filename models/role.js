const User = require('./user')
module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("Role", 
    {   
        type:{
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
    },
    {
        timestamps: false
    }
    );
    return Role;
};
