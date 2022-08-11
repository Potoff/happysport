'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
        email: 'potoff@lavache.com',
        password: 'hachis parmentier',
        createdAt: new Date(),
        updatedAt: new Date(),
        role: 'admin'
      }], {});
  
  },

  async down (queryInterface, Sequelize) {

     return queryInterface.bulkDelete('users', null, {});
     
  }
};
