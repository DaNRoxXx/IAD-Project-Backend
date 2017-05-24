'use strict';
module.exports = function(sequelize, DataTypes) {
  var Campus = sequelize.define('Campus', {
    name: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.Campus.hasMany(models.Account, {as:"Accounts", foreignkey:"campusId"});
        models.Campus.hasMany(models.Class, {as:"Classes", foreignkey:"campusId"});
        models.Campus.belongsToMany(models.Teacher, {as:"Teacher", through:models.CampusTeacher});
        models.Campus.belongsToMany(models.Staff, {as:"Staff", through:models.CampusStaff});
      }
    }
  });
  return Campus;
};