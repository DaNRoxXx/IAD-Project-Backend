'use strict';
module.exports = function(sequelize, DataTypes) {
  var Staff = sequelize.define('Staff', {
    userID: DataTypes.UUID,
    administrator: DataTypes.BOOLEAN,
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.Staff.belongsTo(models.User, {as:"User",foreignkey:"userId"});
        models.Staff.belongsToMany(models.Campus, {as:"Campuses", through:models.CampusStaff});
      }
    }
  });
  return Staff;
};
