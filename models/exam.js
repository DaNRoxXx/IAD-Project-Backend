'use strict';
module.exports = function(sequelize, DataTypes) {
  var Exam = sequelize.define('Exam', {
    time: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.Exam.belongsTo(models.Teaching, {as:"Course"});
      }
    }
  });
  return Exam;
};
