'use strict';
module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('Teacher', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING
  });
  
  // Class Method
  Teacher.associate = function (models) {
      // ...associate the models
      Teacher.belongsTo(models.Subject);
  };
  
  return Teacher;
};