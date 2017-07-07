'use strict';
module.exports = function (sequelize, DataTypes) {
  var Student = sequelize.define('Student', {
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
        models.Student.belongsTo(models.User, {
          as: "User",
          foreignkey: "userId"
        });
        models.Student.belongsTo(models.Section, {
          as: "Class",
          foreignkey: "secId"
        });
      }
    }
  });
  return Student;
};