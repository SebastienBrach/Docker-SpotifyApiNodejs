const Me = require("../API/Me.js");
const me = new Me.instance()
const dotenv = require('dotenv').config();
const express = require('express')
const router = express.Router()

router.get(process.env.ME_GET_ALL, async (req, res) => {
    let allMyAccountData = await me.getAllMyAccountData()
    res.json(allMyAccountData)
})

router.get(process.env.ME_GET_ACCOUNT, async (req, res) => {
    let myAccountDat = await me.getMyAccountData()
    res.json(myAccountDat)
})

router.get(process.env.ME_GET_PLAYLISTS, async (req, res) => {
    let myPlaylists = await me.getMyPlaylists()
    res.json(myPlaylists)
})

router.get(process.env.ME_GET_FOLLOWED_ARTISTS, async (req, res) => {
    let myFollowedArtists = await me.getMyFollowedArtists()
    res.json(myFollowedArtists)
})

router.get(process.env.ME_GET_SAVED_TRACKS, async (req, res) => {
    let mySavedTracks = await me.getMySavedTracks()
    res.json(mySavedTracks)
})

router.get(process.env.ME_GET_SAVED_ALBUMS, async (req, res) => {
    let mySavedAlbums = await me.getMySavedAlbums()
    res.json(mySavedAlbums)
})

router.get(process.env.ME_GET_TOP_ARTISTS, async (req, res) => {
    let myTopArtists = await me.getMyTopArtists()
    res.json(myTopArtists)
})

router.get(process.env.ME_GET_TOP_TRACKS, async (req, res) => {
    let myTopTracks = await me.getMyTopTracks()
    res.json(myTopTracks)
})

module.exports = router