'use strict';
module.exports = function (sequelize, DataTypes) {
  var Activity = sequelize.define('Activity', {
    date: DataTypes.STRING,
    description: DataTypes.STRING,
    sectionId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function (models) {
        // associations can be defined here
        models.Activity.belongsTo(models.Section, {
          as: "Section",
          foreignkey: "sectionId"
        });
        models.Activity.hasMany(models.Attachment, {
          as: "Attachments",
          foreignkey: "activityId"
        });
      }
    }
  });
  return Activity;
};