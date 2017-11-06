'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Teachers', 'SubjectId', {type: Sequelize.INTEGER})
    .then(()=>{
      queryInterface.addConstraint('Teachers', ['SubjectId'], {
        type: 'FOREIGN KEY',
        references: { //Required field
          table: 'Subjects',
          field: 'id'
        }
      })
    })
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
