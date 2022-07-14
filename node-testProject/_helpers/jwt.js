const expressJwt = require("express-jwt");
const config = require("../api/config.json");

module.exports = jwt;

function jwt() {
  const { secret } = config;
  return expressJwt({ secret, algorithms: ["HS256"] }).unless({
    path: [
      // public routes that don't require authentication
      "/system-user/authenticate",
      "/bookings/verify/:token_mail",
     "/bookings/signup"
    ],
  });
}
