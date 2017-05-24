'use strict';
module.exports = function(sequelize, DataTypes) {
  var ClassCourse = sequelize.define('ClassCourse', {

  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return ClassCourse;
};