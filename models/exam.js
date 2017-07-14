'use strict';
module.exports = function (sequelize, DataTypes) {
  var Exam = sequelize.define('Exam', {
    courseID: DataTypes.INTEGER,
    teachingID: DataTypes.INTEGER,
    name: DataTypes.STRING,
    date: DataTypes.STRING,
    time: DataTypes.STRING
  }, {
    classMethods: {
      associate: function (models) {
        // associations can be defined here
        /*models.Exam.belongsTo(models.Teaching, {
          //as: "Course"
        });*/
      }
    }
  });
  return Exam;
};