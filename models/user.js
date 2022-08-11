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
        role:{
            type: Sequelize.STRING,
        }
    }
    );
    return User;
};
