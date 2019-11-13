const bcrypt = require('bcryptjs');

const saltCount = 10;

function hashPassword(password) {
  const hashedPassword = new Promise((resolve, reject) => {
    bcrypt.hash(password, saltCount, function(err, hash) {
      if (err) reject(err);
      resolve(hash);
    });
  });

  return hashedPassword;
}

module.exports = hashPassword;
