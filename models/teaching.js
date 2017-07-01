'use strict';
module.exports = function(sequelize, DataTypes) {
  var Teaching = sequelize.define('Teaching', {
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.Teaching.belongsTo(models.Teacher, {as:"Teacher"});
        models.Teaching.belongsTo(models.Course, {as:"Course"});
        models.Teaching.belongsTo(models.Section, {as:"Section"});
      }
    }
  });
  return Teaching;
};