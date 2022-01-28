const crypto = require("crypto");

module.exports = {
  async up(queryInterface, Sequelize) {
    const dateTime = { createdAt: new Date(), updatedAt: new Date() };

    await queryInterface.bulkInsert(
      "gateway",
      [
        {
          service: "videos",
          url: "http://127.0.0.1:3000",
          token: crypto.randomBytes(64).toString("hex"),
          ...dateTime,
        },
        {
          service: "users",
          url: "http://127.0.0.1:3001",
          token: crypto.randomBytes(64).toString("hex"),
          ...dateTime,
        },
        {
          service: "subscriptions",
          url: "http://127.0.0.1:3002",
          token: crypto.randomBytes(64).toString("hex"),
          ...dateTime,
        },
        {
          service: "history",
          url: "http://127.0.0.1:3003",
          token: crypto.randomBytes(64).toString("hex"),
          ...dateTime,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("gateway", null, {});
  },
};
