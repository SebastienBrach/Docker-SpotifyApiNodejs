const express = require('express')
const app = express()
const port = 3000
// const getMe = require("./getMe.js");
const Spotify = require("./spotify.js");
let spotify = new Spotify.instance()

app.get('/', (req, res) => {
  res.redirect(spotify.redirectToCallback())
})

app.get('/auth', async (req, res) => {
  let authResponse = await spotify.auth(req)
  res.send(`${authResponse.state} : ${authResponse.message}`)
})

app.get('/getMe', async (req, res) => {
  res.send(await getMe.getDataAboutMe())
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})