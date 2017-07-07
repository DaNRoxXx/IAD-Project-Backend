'use strict';
module.exports = function(sequelize, DataTypes) {
  var CampusStaff = sequelize.define('CampusStaff', {
    staffID: DataTypes.UUID,
    campusID: DataTypes.INTEGER,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return CampusStaff;
};
