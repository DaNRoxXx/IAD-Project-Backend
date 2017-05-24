'use strict';
module.exports = function(sequelize, DataTypes) {
  var Account = sequelize.define('Account', {
    name:DataTypes.STRING,
    amount: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.Account.belongsTo(models.Campus, {as:"Campus",foreignkey:"campusId"});
      }
    }
  });
  return Account;
};