const Role = require('./role')
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("User", 
    {
        email:{
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password:{
            type: Sequelize.STRING,
            allowNull:false
        },
        RoleId:{
            type: Sequelize.INTEGER,
            allowNull:false,
            references: {
                model: "Roles",
                key: "id"
            }

        }
    },
    {
        timestamps: false
    }
    );
    return User;
};

