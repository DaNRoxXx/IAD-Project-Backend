'use strict';
module.exports = function(sequelize, DataTypes) {
  var Admin = sequelize.define('Admin', {

  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.Admin.belongsTo(models.User, {as:"User"});
      }
    }
  });
  return Admin;
};