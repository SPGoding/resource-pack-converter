# Resource Pack Converter

[![CircleCI](https://img.shields.io/circleci/build/gh/SPGoding/resource-pack-converter.svg?logo=circleci&style=flat-square&token=bb6d895d4f5fe0183fd8220ce3d01e860ecf59bb)](https://circleci.com/gh/SPGoding/resource-pack-converter)
[![npm](https://img.shields.io/npm/v/resource-pack-converter.svg?logo=npm&style=flat-square)](https://npmjs.com/package/resource-pack-converter)
[![License](https://img.shields.io/github/license/SPGoding/resource-pack-converter.svg?style=flat-square)](https://github.com/SPGoding/resource-pack-converter/blob/master/LICENSE)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)
[![Gitmoji](https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat-square)](https://gitmoji.carloscuesta.me/)

:construction: 制作中…

## 它都做了什么
### JE1.6 至 JE1.7
- 修改 `pack.mcmeta` 中的 `pack.pack_format` 为 1
- 将贴图 `minecraft:items/fish_cooked` 移动到 `minecraft:items/fish_cod_cooked`
- 将贴图 `minecraft:items/fish_raw` 移动到 `minecraft:items/fish_cod_raw`

### JE1.7 至 JE1.8
- 修改 `pack.mcmeta` 中的 `pack.pack_format` 为 1
- 将贴图 `minecraft:entity/steve` 修改为双层皮肤格式

### JE1.8 至 JE1.9
- 修改 `pack.mcmeta` 中的 `pack.pack_format` 为 2
- 将模型 `minecraft:block/fire_floor_main` 移动到 `minecraft:block/fire_floor0`
- 将模型 `minecraft:block/fire_u1` 移动到 `minecraft:block/fire_up`
- 将模型 `minecraft:block/fire_u2` 移动到 `minecraft:block/fire_up_alt`
- 将模型 `minecraft:block/mossy_wall_post` 移动到 `minecraft:block/mossy_cobblestone_wall_post`
- 将模型 `minecraft:item/clock` 中定义的贴图 `#layer0`（默认为 `minecraft:items/clock`）拆分
- 将模型 `minecraft:item/compass` 中定义的贴图 `#layer0`（默认为 `minecraft:items/compass`）拆分
