# Resource Pack Converter

[![CircleCI](https://img.shields.io/circleci/build/gh/SPGoding/resource-pack-converter.svg?logo=circleci&style=flat-square&token=bb6d895d4f5fe0183fd8220ce3d01e860ecf59bb)](https://circleci.com/gh/SPGoding/resource-pack-converter)
[![npm](https://img.shields.io/npm/v/resource-pack-converter.svg?logo=npm&style=flat-square)](https://npmjs.com/package/resource-pack-converter)
[![License](https://img.shields.io/github/license/SPGoding/resource-pack-converter.svg?style=flat-square)](https://github.com/SPGoding/resource-pack-converter/blob/master/LICENSE)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)
[![Gitmoji](https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat-square)](https://gitmoji.carloscuesta.me/)

:construction: Still work in progress...

The RPC (Resource Pack Converter) is a npm package which can convert a Minecraft: Java Edition resource pack from 
any version to another version.

- [Resource Pack Converter](#Resource-Pack-Converter)
    - [Usage](#Usage)
        - [Use it Online](#Use-it-Online)
        - [Import it to your Project](#Import-it-to-your-Project)
    - [File Structure](#File-Structure)
    - [How does it Work](#How-does-it-Work)
        - [Overview](#Overview)
        - [Adapters](#Adapters)
        - [Conversions](#Conversions)
    - [Contributing](#Contributing)

## Usage

You can use it via the official website or importing it to your project.

### Use it Online

Open [the official website](https://rpc.spgoding.com).

IT'S NOT AVALIABLE ACTUALLY.

### Import it to your Project

0. Installation.
    ```Bash
    npm i resource-pack-converter
    ```
1. Import.
    ```TypeScript
    import { convert } from 'resource-pack-converter'
    ```
2. *TODO*

## File Structure

- `src`: Source code written in TypeScript.
- `lib`: Output JavaScript files.
- `uti`: Some useful tools while coding.
    - `analyzer.js`: An resource pack analyzer which can find the differences (e.g. file names) between 
    two resource packs (only support folders) and generate conversion files. Use
    ```Bash
    npm run uti:analyzer ${fromDir} ${toDir} ${outDir}
    ```
    to analyze differences between `${fromDir}` and `${toDir}`. The result will be stored in `uti/analyzer/${outDir}`.
    e.g. 
    ```Bash
    npm run uti:analyzer uti/input/1.6/ uti/input/1.7/ 1.6-1.7.json
    ```

## How does it Work

### Overview

The RPC will decompressed the input resource pack if it's compressed, and then execute all *adapters* orderly for each file 
in the resource pack according to specific *conversion*. All adapted files will be put in specific path under `${outDir}`,
so nothing will be changed in the source resource pack.

### Adapters

*Adapters* carry out operations for single file in the resource pack, e.g. renaming, scaling image, 
changing text content, etc. All adapters are written in TypeScript and should implement the `Adapter` interface. 
They are located in `./src/adapters/`.

Adapters may be referenced in *conversions*.

### Conversions

A *Conversion* contains a set of *adapters*. It's stored in `./src/conversions/`.

- The root tag.
    - `adapters`: (Required) Array. Contains a set of adapters.
    - `from`: (Required) String. Specifies the game version which the conversion starts from.
    - `to`: (Required) String. Specifies the game version which the conversion ends with.

## Contributing

I'm thrilled to hear that you'd like to contribute to this project. It's no doubt that the converter will be better 
with your help!

1.  Fork this this repo and clone it to your local.

2.  Install dependencies.

    `npm i`

3.  Edit files in `./src`.

4.  If you add new features, it's strongly recommend to write tests for them. All tests should be put under `./src/test`.

5.  Commit your changes by `npm run commit` and then push them to the origin.

6.  Open a Pull Request. The circle CI will build and test your changes automatically.

There must be lots of mistakes and bad practice in this repository. If you find something not good or not sure whether it's not good, please don't hesitate to tell me!
