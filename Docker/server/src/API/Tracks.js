// const fs = require('fs')
// const SpotifyWebApi = require('spotify-web-api-node')
// const token = fs.existsSync(process.env.TOKEN_FILE) ? fs.readFileSync(process.env.TOKEN_FILE, 'utf8') : ""
// const spotifyApi = new SpotifyWebApi()
// spotifyApi.setAccessToken(token)


// async function getAlbumTracks(albumID, limit, offset){
//     let tracks = await spotifyApi.getAlbumTracks(albumID, {limit:limit, offset :offset})
//     return tracks.body
// }

// async function getArtistTopTracks(artistID, location){
//     let tracks = await spotifyApi.getArtistTopTracks(artistID, location)
//     return tracks.body
// }

// // spotifyApi.searchTracks('Love') => tracks whose name, album or artist contains 'Love'
// // spotifyApi.searchTracks('artist:Love') => tracks whose artist's name contains 'Love'
// // spotifyApi.searchTracks('track:Alright artist:Kendrick Lamar') => tracks whose artist's name contains 'Kendrick Lamar', and track name contains 'Alright'
// async function searchTracks(data){
//     let track = await spotifyApi.searchTracks(data)
//     return track.body
// }

// module.exports = {
//     getAlbumTracks: getAlbumTracks,
//     getArtistTopTracks : getArtistTopTracks,
//     searchTracks : searchTracks,
// }



// ### TRACKS ###
// SEARCH_ALBUMS=/track/getAudio
// SEARCH_ALBUMS=/track/addToSavedTracks
// SEARCH_ALBUMS=/track/removeFromSavedTracks
// ### TRACKS ###