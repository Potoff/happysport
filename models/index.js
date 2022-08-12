'use strict';
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '../config/config'))[env];
const db = {};


let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

sequelize.sync({force: true})
  .then( () => console.log('Postgres synchro tonton, c\'est bieng !'))
  .then(() =>{
    db.role.create({
      type:'admin'
    })
  })
  .then(() => {
    db.role.create({
      type:'franchise'
    })
  })
  .then(() => {
    db.role.create({
      type:'salle'
    })
  })
  .then(() => {
    db.user.create({
      email: 'potoff@lavache.com',
      password: 'vache',
      RoleId: 1
    })
  })
  .catch((err) => {
    console.log({err: err})
  });

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.user = require('./user')(sequelize, Sequelize);
db.role = require('./role')(sequelize, Sequelize);

db.role.hasMany(db.user, { as: "Users"});
db.user.belongsTo(db.role, {
  foreignKey:{
    name: "RoleId",
    allowNull: false
  },
  as: "Role"
});

module.exports = db;
