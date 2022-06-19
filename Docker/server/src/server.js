const express = require('express')
const app = express()
const dotenv = require('dotenv').config();
const port = 3000
const Me = require("./API/Me.js");
const Spotify = require("./Auth/SpotifyAPIAuth.js");

const spotify = new Spotify.instance()
const me = new Me.instance()

app.get('/', (req, res) => {
  res.redirect(spotify.redirectToCallback())
})

app.get(process.env.AUTH_CALLBACK, async (req, res) => {
  await spotify.auth(req)
  res.redirect(process.env.ME_GET_ACCOUNT)
})

app.get(process.env.ME_GET_ALL, async (req, res) => {
  let allMyAccountData = await me.getAllMyAccountData()
  res.json(allMyAccountData)
})

app.get(process.env.ME_GET_ACCOUNT, async (req, res) => {
  let myAccountDat = await me.getMyAccountData()
  res.json(myAccountDat)
})

app.get(process.env.ME_GET_PLAYLISTS, async (req, res) => {
  let myPlaylists = await me.getMyPlaylists()
  res.json(myPlaylists)
})

app.get(process.env.ME_GET_FOLLOWED_ARTISTS, async (req, res) => {
  let myFollowedArtists = await me.getMyFollowedArtists()
  res.json(myFollowedArtists)
})

app.get(process.env.ME_GET_SAVED_TRACKS, async (req, res) => {
  let mySavedTracks = await me.getMySavedTracks()
  res.json(mySavedTracks)
})

app.get(process.env.ME_GET_SAVED_ALBUMS, async (req, res) => {
  let mySavedAlbums = await me.getMySavedAlbums()
  res.json(mySavedAlbums)
})

app.get(process.env.ME_GET_TOP_ARTISTS, async (req, res) => {
  let myTopArtists = await me.getMyTopArtists()
  res.json(myTopArtists)
})

app.get(process.env.ME_GET_TOP_TRACKS, async (req, res) => {
  let myTopTracks = await me.getMyTopTracks()
  res.json(myTopTracks)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})