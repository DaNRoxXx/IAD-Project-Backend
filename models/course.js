'use strict';
module.exports = function(sequelize, DataTypes) {
  var Course = sequelize.define('Course', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.Course.belongsToMany(models.Class, {as:"Classes", through:"ClassCourse"});
      }
    }
  });
  return Course;
};
