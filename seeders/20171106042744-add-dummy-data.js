'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Subjects',
    [{
      subject_name: 'Kimia',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      subject_name: 'Matimatika',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
    .then(()=>{
      queryInterface.bulkInsert('Teachers',
      [{
        first_name: "Bambang",
        last_name: "Suprapto",
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        first_name: "Sudjarwo",
        last_name: "Wonokrio",
        createdAt: new Date(),
        updatedAt: new Date()
      }])
      .then(()=>{
        
      })
    })
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
