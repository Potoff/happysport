require('./user');
module.exports = (sequelize, Sequelize) => {
    const Partner = sequelize.define("Partner", 
    {   
        name:{
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            notEmpty: true
        },
        email:{
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            notEmpty: true
        },
        description:{
            type: Sequelize.TEXT,
        },
        image_url:{
            type: Sequelize.TEXT,
            defaultValue: "https://cdn.pixabay.com/photo/2017/01/09/11/30/dumbbell-1966247_960_720.jpg",
            allowNull: false,
            notEmpty: true
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
        }
    },
    {
        timestamps: false
    }
    );
    return Partner;
};
