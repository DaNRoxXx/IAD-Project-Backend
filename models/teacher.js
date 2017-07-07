'use strict';
module.exports = function (sequelize, DataTypes) {
  var Teacher = sequelize.define('Teacher', {
    userID: DataTypes.UUID,
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    }
  }, {
    classMethods: {
      associate: function (models) {
        // associations can be defined here
        models.Teacher.belongsTo(models.User, {
          as: "User",
          foreignkey: "userId"
        });
        models.Teacher.belongsToMany(models.Campus, {
          as: "Campuses",
          through: models.CampusTeacher
        });
      }
    }
  });
  return Teacher;
};