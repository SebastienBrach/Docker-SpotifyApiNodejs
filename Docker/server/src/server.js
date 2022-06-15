const express = require('express')
const app = express()
const dotenv = require('dotenv').config();
const port = 3000
const Me = require("./me.js");
const Spotify = require("./spotify.js");

const spotify = new Spotify.instance()
const myData = new Me.instance()

app.get('/', (req, res) => {
  res.redirect(spotify.redirectToCallback())
})

app.get('/auth', async (req, res) => {
  let test = await spotify.auth(req)
  res.redirect('/getAllMyAccountData')
})

app.get('/getAllMyAccountData', async (req, res) => {
  await myData.getAllMyAccountData()
  res.json(myData)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})