"use strict";

var _generator = _interopRequireDefault(require("../lib/generator"));

var _meow = _interopRequireDefault(require("meow"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const main = async () => {
  const cli = (0, _meow.default)(`
  By default the resulting meme image ends up in your clipboard. Just paste it wherever.

  Usage
    $ meme <image url>
    
    If no image url is given it defaults to Lumbergh.

    Options
      --toptext, -t Text at the top of the image
      --bottomtext, -b Text at the bottom of the image
      --output, -o The location and filename to where to save the png image (if you also want it as a file)
    
    Examples
      $ meme https://imgflip.com/s/meme/One-Does-Not-Simply.jpg -t "One does not simply" -b "create a meme generator"
      $ meme -t "if you could use my meme generator" -b "that would be great"
      $ meme -b "That would be great" -o "./my-meme.png"
    `, {
    flags: {
      toptext: {
        type: 'string',
        alias: 't'
      },
      bottomtext: {
        type: 'string',
        alias: 'b'
      },
      output: {
        type: 'string',
        alias: 'o'
      }
    }
  });
  const imagePath = cli.input[0];
  const topText = cli.flags.toptext;
  const bottomText = cli.flags.bottomtext;
  const output = cli.flags.output;

  if (!topText && !bottomText) {
    return console.log(cli.help);
  }

  (0, _generator.default)({
    imagePath,
    topText,
    bottomText,
    output
  });
};

module.exports = main;