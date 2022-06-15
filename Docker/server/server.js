const express = require('express')
const app = express()
const port = 3000
const me = require("./me.js");
const Spotify = require("./spotify.js");
let spotify = new Spotify.instance()

app.get('/', (req, res) => {
  res.redirect(spotify.redirectToCallback())
})

app.get('/auth', async (req, res) => {
  let test = await spotify.auth(req)
  res.redirect('/getMe')
})

app.get('/getMe', async (req, res) => {
  const myAccountData = await me.getDataAboutMe()
  const myPlaylists = await me.getMyPlaylists(myAccountData.body.id)
  const myFollowedArtists = await me.getFollowedArtists()
  const mySavedTracks = await me.getMySavedTracks()
  const mySavedAlbums = await me.getMySavedAlbums()
  const myTopArtists = await me.getMyTopArtists()
  const myTopTracks = await me.getMyTopTracks()
  const myData = {
    myAccountData: myAccountData,
    myPlaylists: myPlaylists,
    myFollowedArtists: myFollowedArtists,
    mySavedTracks: mySavedTracks,
    mySavedAlbums: mySavedAlbums,
    myTopArtists: myTopArtists,
    myTopTracks: myTopTracks,
  }
  res.json(myData)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})