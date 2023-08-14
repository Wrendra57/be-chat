'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("MemberRoomChats", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      room_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "RoomChats",
          key: "id",
        },
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "Users",
          key: "uuid",
        },
      },
      isAdmin: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("MemberRoomChats");
  }
};