'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subject = sequelize.define('Subject', {
    subject_name: DataTypes.STRING
  });
  
  // Class Method
  Subject.associate = function (models) {
      // ...associate the models
      Subject.hasMany(models.Teacher);
  };
  
  return Subject;
};