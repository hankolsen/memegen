const { createCanvas, loadImage } = require('canvas');
const { copyImg } = require('img-clipboard');
const fs = require('fs');

const getCanvas = ({ width, image }) => {
  const canvasHeight = (image.height / image.width) * width;
  const canvas = createCanvas(width, canvasHeight);
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, width, canvasHeight);
  ctx.drawImage(image, 0, 0, width, canvasHeight);
  return { canvas, height: canvasHeight };
};

const writeText = ({ canvas, width, height, topText, bottomText }) => {
  const x = width / 2;
  const y = 10;
  const fontSize = 23;
  const ctx = canvas.getContext('2d');

  ctx.textBaseline = 'top';
  fitText({ ctx, x, y, text: topText, fontSize });

  ctx.textBaseline = 'bottom';
  fitText({
    ctx,
    x,
    y: height - y / 2,
    text: bottomText,
    fontSize,
    fromBottom: true,
  });
};

const fitText = ({ ctx, x, y, text, fontSize, fromBottom = false }) => {
  const fontFamily = 'impact';
  const lineHeightRatio = 1.5 * (fromBottom ? -1 : 1);
  const maxWidth = 480;
  const maxLines = 2;
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'black';
  ctx.mutterLine = 2;
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.font = `bold ${fontSize}pt ${fontFamily}`;
  const lineHeight = lineHeightRatio * fontSize;
  let lines = [];
  let line = '';

  const words = text.toUpperCase().split(' ');
  words.forEach((word) => {
    const testLine = line ? `${line} ${word}` : word;
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth) {
      lines = fromBottom ? [line, ...lines] : [...lines, line];
      line = word;
    } else {
      line = testLine;
    }
  });
  lines = fromBottom ? [line, ...lines] : [...lines, line];

  if (lines.length > maxLines) {
    fitText({ ctx, x, y, fontSize: fontSize - 5, text, fromBottom });
  } else {
    lines.forEach((line, i) => {
      ctx.strokeText(line, x, y + lineHeight * i);
      ctx.fillText(line, x, y + lineHeight * i);
    });
  }
};

const writeMeme = (canvas) => {
  const stream = canvas.createPNGStream('image/png');
  const out = fs.createWriteStream(__dirname + '/../test.png');
  stream.pipe(out);
  out.on('finish', () => console.log('Done'));
};

const generator = async ({
  width = 500,
  imagePath = 'https://i.kym-cdn.com/entries/icons/original/000/011/976/lumbergh.jpg',
  topText = '',
  bottomText = '',
} = {}) => {
  const image = await loadImage(imagePath);
  const { canvas, height } = getCanvas({ width, image });
  writeText({
    canvas,
    width,
    height,
    topText,
    bottomText,
  });
  copyImg(Buffer.from(canvas.toBuffer(), 'base64'));
  console.log('Done! Just paste the content of your clipboard wherever you want the image!');
  // writeMeme(canvas);
};

module.exports = generator;
