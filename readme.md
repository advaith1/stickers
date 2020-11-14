# [Discord Sticker List](https://stickers.advaith.io)

Shows a page with all currently available [Discord stickers](https://dis.gd/stickerswhen), displayed in columns by sticker pack, showing the sticker's tags on hover.

To avoid hitting Discord ratelimits, data is cached for 30 seconds.

You can view the site at [stickers.advaith.io](https://stickers.advaith.io).

---

### Setup

Requires [Node.js](https://nodejs.org) 14+, [TypeScript](https://typescriptlang.org), [pnpm](https://pnpm.js.org), and [Sass](https://sass-lang.com). You must also have a [Discord bot application](https://discord.com/developers).

1. Fill out the `.env` file
2. Install dependencies with `pnpm i`
3. Compile the TypeScript code with `tsc`
4. Compile the Sass code with `pnpm run sass`
5. Run with `pnpm start`
