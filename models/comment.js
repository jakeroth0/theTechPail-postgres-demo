const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");
// below creates a new Sequelize model for Category
class Comment extends Model {}

Comment.init({
    id: {
        type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    comment_text: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "user",
            key: "id",
        },
    },
    comment_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "post",
            key: "id"
        },
    },
},
{
    // links db connection
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "comment",
  },
);

module.exports = Comment;