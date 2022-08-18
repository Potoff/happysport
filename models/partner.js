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
            defaultValue: "https://cdn.pixabay.com/photo/2017/01/09/11/30/dumbbell-1966247_960_720.jpg"
        },
        is_active:{
            type: Sequelize.BOOLEAN,
            allowNull: false,
            notEmpty: true,
            defaultValue: "true"
        }
    },
    {
        timestamps: false
    }
    );
    return Partner;
};
