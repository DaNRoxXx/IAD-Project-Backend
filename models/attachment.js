'use strict';
module.exports = function(sequelize, DataTypes) {
  var Attachment = sequelize.define('Attachment', {
    file: DataTypes.BLOB
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.Attachment.belongsTo(models.Activity, {as:"Activity", foreignkey:"activityId"});
      }
    }
  });
  return Attachment;
};