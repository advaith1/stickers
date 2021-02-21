import express from 'express'
import fetch from 'node-fetch'
import path from 'path'
import * as stickers from './stickers.json'
import fs from 'fs'
const app = express()
app.set('view engine', 'ejs')

const token = process.env.TOKEN

let cache: {
	lastUpdated?: number
} = {}

app.get('/', async (_, res) => {
	if(!cache.data || Date.now() - cache.lastUpdated > 30000) {
		const r = await fetch('https://discord.com/api/v8/sticker-packs/directory-v2/758482250722574376?with_store_listings=true', {headers: {authorization: `Bot ${token}`}})
		cache.lastUpdated = Date.now()
		fs.writeFile('stickers.json', r, function (err) {
  			if (err) console.log(err);
  			console.log('Data updated.');
		});
	}
	res.render('index', { data: stickers })
})

app.get('/lottie/:id/:asset', async (req, res) => {
	const r = await fetch(`https://storage.googleapis.com/discord/stickers/${req.params.id}/${req.params.asset}.json`)
	r.body.pipe(res)
})

app.get('/style.css', (_, res) => res.sendFile(path.resolve('out/style.css')))

app.use('/img', express.static(path.resolve('img')))

app.get('/arc-sw.js', async (_, res) => {
	res.type('text/javascript')
	const r = await fetch('https://arc.io/arc-sw.js')
	r.body.pipe(res)
})

app.use((_, res) => res.status(404).render('404'))

app.listen(process.env.PORT, () => console.log('✔ started!'))
