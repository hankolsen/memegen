var $cQ0f4$meow = require("meow");
var $cQ0f4$path = require("path");
var $cQ0f4$canvas = require("canvas");
var $cQ0f4$imgclipboard = require("img-clipboard");
var $cQ0f4$fs = require("fs");

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "default", () => $b72b0f73163e1c56$export$2e2bcd8739ae039);





var $a3c98ce99602259b$var$$parcel$__dirname = $cQ0f4$path.resolve(__dirname, "../src");
const $a3c98ce99602259b$var$fitText = ({ ctx: ctx, x: x, y: y, text: text, fontSize: fontSize, fromBottom: fromBottom = false })=>{
    const fontFamily = "Impact";
    const lineHeightRatio = 1.5 * (fromBottom ? -1 : 1);
    const maxWidth = 480;
    const maxLines = 2;
    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";
    ctx.mutterLine = 2;
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.font = `bold ${fontSize}pt ${fontFamily}`;
    const lineHeight = lineHeightRatio * fontSize;
    let lines = [];
    let line = "";
    const words = text.toUpperCase().split(" ");
    words.forEach((word)=>{
        const testLine = line ? `${line} ${word}` : word;
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth) {
            lines = fromBottom ? [
                line,
                ...lines
            ] : [
                ...lines,
                line
            ];
            line = word;
        } else line = testLine;
    });
    lines = fromBottom ? [
        line,
        ...lines
    ] : [
        ...lines,
        line
    ];
    if (lines.length > maxLines) $a3c98ce99602259b$var$fitText({
        ctx: ctx,
        x: x,
        y: y,
        fontSize: fontSize - 5,
        text: text,
        fromBottom: fromBottom
    });
    else lines.forEach((l, i)=>{
        ctx.strokeText(l, x, y + lineHeight * i);
        ctx.fillText(l, x, y + lineHeight * i);
    });
};
const $a3c98ce99602259b$var$writeMeme = (canvas, output)=>{
    const stream = canvas.createPNGStream();
    const out = (0, ($parcel$interopDefault($cQ0f4$fs))).createWriteStream(output);
    stream.pipe(out);
    out.on("finish", ()=>// eslint-disable-next-line no-console
        console.log(`...and your image is available as ${output}`));
};
const $a3c98ce99602259b$var$getCanvas = ({ width: width, image: image })=>{
    const canvasHeight = image.height / image.width * width;
    (0, $cQ0f4$canvas.registerFont)(`${$a3c98ce99602259b$var$$parcel$__dirname}/assets/fonts/impact.ttf`, {
        family: "Impact"
    });
    const canvas = (0, $cQ0f4$canvas.createCanvas)(width, canvasHeight);
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, width, canvasHeight);
    ctx.drawImage(image, 0, 0, width, canvasHeight);
    return {
        canvas: canvas,
        height: canvasHeight
    };
};
const $a3c98ce99602259b$var$writeText = ({ canvas: canvas, width: width, height: height, topText: topText, bottomText: bottomText })=>{
    const x = width / 2;
    const y = 10;
    const fontSize = 23;
    const ctx = canvas.getContext("2d");
    ctx.textBaseline = "top";
    $a3c98ce99602259b$var$fitText({
        ctx: ctx,
        x: x,
        y: y,
        text: topText,
        fontSize: fontSize
    });
    ctx.textBaseline = "bottom";
    $a3c98ce99602259b$var$fitText({
        ctx: ctx,
        x: x,
        y: height - y / 2,
        text: bottomText,
        fontSize: fontSize,
        fromBottom: true
    });
};
const $a3c98ce99602259b$var$generator = async ({ width: width = 500, imagePath: imagePath = `${$a3c98ce99602259b$var$$parcel$__dirname}/assets/images/That-Would-Be-Great.jpg`, topText: topText = "", bottomText: bottomText = "", output: output = "" } = {})=>{
    const image = await (0, $cQ0f4$canvas.loadImage)(imagePath);
    const { canvas: canvas, height: height } = $a3c98ce99602259b$var$getCanvas({
        width: width,
        image: image
    });
    $a3c98ce99602259b$var$writeText({
        canvas: canvas,
        width: width,
        height: height,
        topText: topText,
        bottomText: bottomText
    });
    (0, $cQ0f4$imgclipboard.copyImg)(Buffer.from(canvas.toBuffer(), "base64"));
    if (output) $a3c98ce99602259b$var$writeMeme(canvas, output);
    // eslint-disable-next-line no-console
    console.log("Done! Just paste the content of your clipboard wherever you want the image");
};
var $a3c98ce99602259b$export$2e2bcd8739ae039 = $a3c98ce99602259b$var$generator;


const $b72b0f73163e1c56$var$main = async ()=>{
    const cli = (0, ($parcel$interopDefault($cQ0f4$meow)))(`
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
                type: "string",
                alias: "t"
            },
            bottomtext: {
                type: "string",
                alias: "b"
            },
            output: {
                type: "string",
                alias: "o"
            }
        }
    });
    const imagePath = cli.input[0];
    const topText = cli.flags.toptext;
    const bottomText = cli.flags.bottomtext;
    const { output: output } = cli.flags;
    if (!topText && !bottomText) {
        // eslint-disable-next-line no-console
        console.log(cli.help);
        return;
    }
    (0, $a3c98ce99602259b$export$2e2bcd8739ae039)({
        imagePath: imagePath,
        topText: topText,
        bottomText: bottomText,
        output: output
    });
};
var $b72b0f73163e1c56$export$2e2bcd8739ae039 = $b72b0f73163e1c56$var$main;


//# sourceMappingURL=index.js.map
