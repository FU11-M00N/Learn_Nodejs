const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            name: {
               type: Sequelize.STRIN(20),
               allowNull: false,
               unique: true,
            },
            age: {
               type: Sequelize.INTEGER.UNSIGNED,
               allowNull: false,
            },
            married: {
               type: Sequelize.BOOLEAN,
               allowNull: false,
            },
            comment: {
               type: Sequelize.TEXT,
               allowNull: true,
            },
            created_at: {
               allowNull: Sequelize.DATE,
               type: Sequelize.DATE,
               defaultValue: Sequelize.NOW,
            },
         },
         {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
         },
      );
   }
   static associations(db) {
      db.User.hasMany(db.Commnet, { foreignKey: 'commenter', sourceKey: 'id' });
   }
};
