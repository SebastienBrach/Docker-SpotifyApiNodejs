const express = require('express')
const app = express()
const port = 3000
const Spotify = require("./Auth/SpotifyAPIAuth.js");
const spotify = new Spotify.instance()


// VOIR DES VIDÉOS SUR TYPESCRIPT ET NODEJS
// https://www.alsacreations.com/tuto/lire/1857-Creation-dune-API-REST-avec-Express-et-TypeScript.html

const meRoute = require("./Routes/Me.js");
app.use(process.env.ME_BASE_ROUTE, meRoute);

app.get('/', (req, res) => {
  res.redirect(spotify.redirectToCallback())
})

app.get(process.env.AUTH_CALLBACK, async (req, res) => {
  await spotify.auth(req)
  res.redirect(process.env.ME_BASE_ROUTE+process.env.ME_GET_ACCOUNT)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})