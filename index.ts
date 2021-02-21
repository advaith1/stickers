import express from 'express'
import fetch from 'node-fetch'
import path from 'path'

const app = express()
app.set('view engine', 'ejs')


let cache: {
	lastUpdated?: number
	data?: object
} = {}

app.get('/', async (_, res) => {
	if(!cache.data || Date.now() - cache.lastUpdated > 30000) {
		const r = await fetch('https://discord.com/api/v8/sticker-packs/directory-v2/758482250722574376?with_store_listings=true')
		cache.data = await r.json()
		cache.lastUpdated = Date.now()
	}
	res.render('index', { data: cache.data })
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
