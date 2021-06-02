import express from 'express'
import fetch from 'node-fetch'
import path from 'path'

const app = express()
app.set('view engine', 'ejs')

const token = process.env.TOKEN

let cache: {
	lastUpdated?: number
	data?: object
} = {}

app.get('/', async (_, res) => {
	if(!cache.data || Date.now() - cache.lastUpdated > 30000) {
		const r = await fetch('https://discord.com/api/v9/sticker-packs', {headers: {authorization: `Bot ${token}`}})
		cache.data = await r.json()
		cache.lastUpdated = Date.now()
	}
	res.render('index', { data: cache.data })
})

app.get('/lottie/:id', async (req, res) => {
	const r = await fetch(`https://storage.googleapis.com/discord/stickers/${req.params.id}.json`)
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
