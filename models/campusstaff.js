'use strict';
module.exports = function(sequelize, DataTypes) {
  var CampusStaff = sequelize.define('CampusStaff', {
    
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return CampusStaff;
};
