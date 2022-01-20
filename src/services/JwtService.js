const jwt = require("jsonwebtoken");
const configService = require("./ConfigService");

class JwtService {
  secret(salt) {
    return [configService.jwtSecret, salt].filter(Boolean).join(".");
  }

  sign(payload, salt = "") {
    return jwt.sign(
      {
        ...payload,
        iss: `${configService.name}@${configService.version}`,
        exp: Math.floor(Date.now() / 1000) + 120,
      },
      this.secret(salt)
    );
  }

  verify(token, salt = "") {
    try {
      return jwt.verify(token, this.secret(salt));
    } catch (err) {
      return null;
    }
  }
}

const jwtService = (function loadJwtService() {
  return new JwtService();
  // eslint-disable-next-line prettier/prettier
})();

module.exports = jwtService;
