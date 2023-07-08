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

## Examples

```bash
$ meme https://imgflip.com/s/meme/One-Does-Not-Simply.jpg -t "One does not simply" -b "create a meme generator"
$ meme -t "if you could use my meme generator" -b "that would be great"
$ meme -b "That would be great" -o "./my-meme.png"
```
