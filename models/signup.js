'use strict';
module.exports = function(sequelize, DataTypes) {
  var signup = sequelize.define('signup', {
    userName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return signup;
};