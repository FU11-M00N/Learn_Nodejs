const Sequelize = require('sequelize');

class User extends Sequelize.Model {
   static initiate(sequelize) {
      User.init(
         {
            email: {
               type: Sequelize.STRING(40),
               allowNull: true,
               unique: true,
            },
            nick: {
               type: Sequelize.STRING(15),
               allowNull: false,
            },
            password: {
               type: Sequelize.STRING(100),
               allowNull: true,
            },
            provider: {
               type: Sequelize.ENUM('local', 'kakao'), // local 혹은 kakao 만 가능하게 제한
               allowNull: false,
               defaultValue: 'local',
            },
            snsId: {
               type: Sequelize.STRING(30),
               allowNull: true,
            },
         },
         {
            sequelize,
            timestamps: true, // createdAt, updatedAt
            underscored: false, // create_At, update_At
            modelName: 'User', // js에서 쓰는 이름
            tableName: 'user', // db 이름
            paranoid: true, // deleteAt 추가 (유저 삭제일) // soft delete
            charset: 'utf8',
            collate: 'utf8_general_ci',
         },
      );
   }
   static associate(db) {
      db.User.hasMany(db.Post); // 1:N //default key 'id'
      db.User.belongsToMany(db.User, {
         // N:M // 팔로워
         foreignKey: 'followingId',
         as: 'Followers', // as : 별명
         through: 'Follow',
      });
      db.User.belongsToMany(db.User, {
         // N:M // 팔로잉
         foreignKey: 'followerId',
         as: 'Followings',
         through: 'Follow',
      });
   }
}
module.exports = User;

/* const Sequelize = require('sequelize');

class User extends Sequelize.Model {
   static initiate(sequelize) {
      User.init(
         {
            email: {
               type: Sequelize.STRING(40),
               allowNull: true,
               unique: true,
            },
            nick: {
               type: Sequelize.STRING(15),
               allowNull: false,
            },
            password: {
               type: Sequelize.STRING(100),
               allowNull: true,
            },
            provider: {
               type: Sequelize.ENUM('local', 'kakao'),
               allowNull: false,
               defaultValue: 'local',
            },
            snsId: {
               type: Sequelize.STRING(30),
               allowNull: true,
            },
         },
         {
            sequelize,
            timestamps: true, // 생성일 수정일 삭제일
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
         },
      );
   }

   static associate(db) {
      db.User.hasMany(db.Post);
      db.User.belongsToMany(db.User, {
         // N:M
         foreignKey: 'followingId',
         as: 'Followers',
         through: 'Follow',
      });
      db.User.belongsToMany(db.User, {
         // N:M
         foreignKey: 'followerId',
         as: 'Followings',
         through: 'Follow',
      });
   }
}

module.exports = User;
*/
