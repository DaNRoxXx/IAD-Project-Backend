'use strict';
module.exports = function(sequelize, DataTypes) {
  var Class = sequelize.define('Class', {
    name: DataTypes.STRING,
    fee: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.Class.belongsTo(models.Campus, {as:"Campus",foreignkey:"campusId"});
        models.Class.belongsToMany(models.Course, {as:"Courses", through:"ClassCourse"});
        models.Class.hasMany(models.Section, {as:"Sections", forignkey:"classId"});
      }
    }
  });
  return Class;
};
