const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");
// below creates a new Sequelize model for Category
class Post extends Model {}

Post.init({
    id: {
        type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    post_title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    post_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "user",
            key: "id",
        },
    },
    post_text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
},
{
    // links db connection
    sequelize,
    timestamps: false,
    freezeTableName: true,  
    underscored: true,
    modelName: "post",
  },
);

module.exports = Post;