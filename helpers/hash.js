const bcrypt = require('bcryptjs');

class Hash {
  constructor() {
    this.saltCount = 10;
  }

  hash(password) {
    const hashedPassword = new Promise((resolve, reject) => {
      bcrypt.hash(password, this.saltCount, (err, hash) => {
        if (err) {
          reject(err);
        } else {
          resolve(hash);
        }
      });
    });
    return hashedPassword;
  }

  compare(password, hash) {
    const isCompare = new Promise((resolve, reject) => {
      bcrypt.compare(password, hash, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });

    return isCompare;
  }
}

module.exports = Hash;
