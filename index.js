const generator = require('./lib/generator');

const main = async () => {
  const [, , imagePath, topText, bottomText] = process.argv;
  generator({ imagePath, topText, bottomText });
};

module.exports = main;
