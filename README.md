# memegen

![by Hank™](https://img.shields.io/badge/by-Hank%E2%84%A2-green)
[![npm version](https://img.shields.io/npm/v/@hank-iv/memegen.svg)](//npmjs.com/package/@hank-iv/memegen)
![MIT License](https://img.shields.io/badge/license-MIT-green)

memegen is a meme generator written in NodeJs.

The result from the command will be available in your clipboard, just paste it wherever you want it.

It is also possible to write to a file if that suits you better.

## Installation

```bash
$ npm i -g @hank-iv/memegen
```

## Usage

```bash
$ meme <image url> [options]

Options:
-t, --toptext       The text at the top of the image
-b, --bottomtext    The text at the bottom of the image
-o, --output        Path and filename where a .png image will be saved
```

## Example

```bash
$ meme https://i.kym-cdn.com/entries/icons/original/000/011/976/lumbergh.jpg -t "It would be great" -b "if you used my meme generator"
```
