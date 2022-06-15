const fs = require('fs')
const SpotifyWebApi = require('spotify-web-api-node')
const token = fs.readFileSync('token.json', 'utf8')
const spotifyApi = new SpotifyWebApi()
spotifyApi.setAccessToken(token)

async function getDataAboutMe(){
    let me = await spotifyApi.getMe()
    return me
}

async function getMyPlaylists(idUser){
    const data = await spotifyApi.getUserPlaylists(idUser)
    return data.body.items
}

async function getFollowedArtists(){
    const data = await spotifyApi.getUserPlaylists({ limit : 50 })
    return data.body.artists
}

async function getMySavedTracks(){
    const data = await spotifyApi.getMySavedTracks({
        limit : 50,
        offset: 1
      })
    return data.body.items
}

async function getMySavedAlbums(){
    const data = await spotifyApi.getMySavedTracks({
        limit : 2,
        offset: 1
      })
    return data.body.items
}

async function getMyTopArtists(){
    const data = await spotifyApi.getMyTopArtists()
    return data.body.items
}

async function getMyTopTracks(){
    const data = await spotifyApi.getMyTopTracks({ limit : 50 })
    return data.body.items
}

module.exports = {
    getDataAboutMe : getDataAboutMe,
    getMyPlaylists : getMyPlaylists,
    getFollowedArtists : getFollowedArtists,
    getMySavedTracks : getMySavedTracks,
    getMySavedAlbums : getMySavedAlbums,
    getMyTopArtists : getMyTopArtists,
    getMyTopTracks : getMyTopTracks,
}