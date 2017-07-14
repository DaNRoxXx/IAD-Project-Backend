'use strict';
module.exports = function (sequelize, DataTypes) {
  var Activity = sequelize.define('Activity', {
    date: DataTypes.DATE,
    description: DataTypes.TEXT,
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