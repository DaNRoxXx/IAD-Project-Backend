'use strict';
module.exports = function(sequelize, DataTypes) {
  var ClassCourse = sequelize.define('ClassCourse', {
    classID: DataTypes.INTEGER,
    courseID: DataTypes.INTEGER,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return ClassCourse;
};