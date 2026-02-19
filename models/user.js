const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
    // checkPassword(loginPw) {
    //     return bcrypt.compareSync(loginPw, this.password);
    //   }
}

User.init ({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      },
    user_email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
     isEmail: true,
      },
    },
    user_created: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
   password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
        len: [10],
      },
    },
  },
  {
    // This adds an action in response to another action
    hooks: {
      // beforeCreate hook works with data before a new instance is created
      beforeCreate: async (newUserData) => {
        newUserData.user_email = await newUserData.user_email.toLowerCase();
        newUserData.username = await newUserData.username.toLowerCase();
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      // This is nearly the same as the hook above. It does the same thing but to updated users
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.user_email = await updatedUserData.user_email.toLowerCase();
        updatedUserData.username = await updatedUserData.username.toLowerCase();
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      },

    },
    // links db connection
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  },
)
    // Add hook here
    module.exports = User;

