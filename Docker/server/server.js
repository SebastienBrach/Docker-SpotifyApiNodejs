const express = require('express')
const app = express()
const port = 3000
const getMe = require("./getMe.js");
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
  const me = await getMe.getDataAboutMe()
  const myFollowedArtists = await getMe.getFollowedArtists()
  const mySavedTracks = await getMe.getMySavedTracks()
  const mySavedAlbums = await getMe.getMySavedAlbums()
  const myTopArtists = await getMe.getMyTopArtists()
  const myTopTracks = await getMe.getMyTopTracks()
  const myData = {
    // me: me,
    // playlists: await getMe.getMyPlaylists(me.body.id),
    myTopTracks: myTopTracks,
  }
  res.json(myData)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})