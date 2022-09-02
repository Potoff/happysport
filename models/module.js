module.exports = (sequelize, Sequelize) => {
    const Module = sequelize.define("Module", 
    {   
        name:{
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        description:{
            type: Sequelize.TEXT,
        }
    },
    {
        timestamps: false
    }
    );
    return Module;
};
