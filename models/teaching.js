'use strict';
module.exports = function (sequelize, DataTypes) {
  var Teaching = sequelize.define('Teaching', {
    teacherID: DataTypes.UUID,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    className:  DataTypes.STRING,
    sectionID: DataTypes.INTEGER,
    courseID: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function (models) {
        // associations can be defined here
        models.Teaching.belongsTo(models.Teacher, {
          as: "Teacher"
        });
        models.Teaching.belongsTo(models.Course, {
          as: "Course"
        });
        models.Teaching.belongsTo(models.Section, {
          as: "Section"
        });
      }
    }
  });
  return Teaching;
};