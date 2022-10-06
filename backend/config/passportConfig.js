module.exports = {
  jwt: {
    secret: process.env.JWT_SECRET || "Somestring",
    options: {
      audience: process.env.PORT,
      expiresIn: "12h", // 1d
      issuer: "example.io",
    },
    cookie: {
      httpOnly: true,
      sameSite: true,
      signed: true,
      secure: true,
    },
  },
};

console.log(jwt.secret);
