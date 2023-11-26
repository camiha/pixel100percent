# pixelcomplete
create semi-transparent window from image. for web frontend/design development support.  

![demo](https://github.com/camiha/pixelcomplete/assets/65489256/e04e85aa-7a3b-4562-af5a-0db4f31b327b)

## Feature
- create semi-transparent window from image.
- change window opacity with slider.
- support drag and drop file input.
- change window size by number input.
- move window by arrow keys. (opt + arrow / opt + shift + arrow)
- toggle dark/light mode theme.

## Releases
note: code certificate not yet set.  
[releases](https://github.com/camiha/pixelcomplete/releases)

## Todo
- change image's window size when set image file.
- add tests.

## Self build
require:
- node.js 18+
- rust 1.7+
- tauri development environment (https://tauri.app/v1/guides/getting-started/prerequisites)

steps:
1. `pnpm install`
2. `pnpm tauri build`
3. create application file in `src-tauri/target/release/bundle/`
