const bcrypt = require('bcryptjs');

const saltCount = 10;

async function hashPassword(password) {
  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(password, saltCount, function(err, hash) {
      if (err) reject(err);
      resolve(hash);
    });
  });

  return hashedPassword;
}

module.exports = hashPassword;
