const fs = require('fs')
const SpotifyWebApi = require('spotify-web-api-node')
const token = fs.existsSync(process.env.TOKEN_FILE) ? fs.readFileSync(process.env.TOKEN_FILE, 'utf8') : ""
const spotifyApi = new SpotifyWebApi()
spotifyApi.setAccessToken(token)


// spotifyApi.searchTracks('Love') => tracks whose name, album or artist contains 'Love'
// spotifyApi.searchTracks('artist:Love') => tracks whose artist's name contains 'Love'
// spotifyApi.searchTracks('track:Alright artist:Kendrick Lamar') => tracks whose artist's name contains 'Kendrick Lamar', and track name contains 'Alright'

async function searchTracks(){
    let track = await spotifyApi.searchTracks()
    return track.body
}

module.exports = {
    searchTracks : searchTracks,
}