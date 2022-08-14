'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Roles', [{
      type: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      type: 'franchise',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      type: 'salle',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

  },

  async down(queryInterface, Sequelize) {

    return queryInterface.bulkDelete('Roles', null, {});

  }
};
