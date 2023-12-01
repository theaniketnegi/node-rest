const fs = require("fs");

function logger(filename) {
  return (req, res, next) => {
    fs.appendFile(
      `${filename}`,
      `${Date.now()}:${req.method}:${req.path}\n`,
      (err, _) => {
        next();
      }
    );
  };
}

module.exports = {logger};