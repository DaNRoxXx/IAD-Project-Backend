'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    gender: DataTypes.STRING,
    dob: DataTypes.DATE,
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    }
    
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        
      }
    }
  });
  return User;
};
