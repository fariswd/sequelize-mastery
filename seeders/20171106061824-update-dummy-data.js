'use strict';

const models = require('../models');

module.exports = {
  up: (queryInterface, Sequelize) => {
    let updated = {
      SubjectId: 1
    }
    return models.Teacher.update(updated,{where: {id: 1 }})
  },

  down: (queryInterface, Sequelize) => {
    
  }
};
