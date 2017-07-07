'use strict';
module.exports = function(sequelize, DataTypes) {
  var CampusTeacher = sequelize.define('CampusTeacher', {
    teacherID: DataTypes.UUID,
    campusID: DataTypes.INTEGER,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return CampusTeacher;
};
