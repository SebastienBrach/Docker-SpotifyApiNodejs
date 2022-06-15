// const fs = require('fs')
// const SpotifyWebApi = require('spotify-web-api-node')
// const token = fs.existsSync(process.env.TOKEN_FILE) ? fs.readFileSync(process.env.TOKEN_FILE, 'utf8') : ""
// const spotifyApi = new SpotifyWebApi()
// spotifyApi.setAccessToken(token)

// async function getDataAboutMe(){
//     let me = await spotifyApi.getMe()
//     return me
// }

// async function getMyPlaylists(idUser){
//     const data = await spotifyApi.getUserPlaylists(idUser)
//     return data.body.items
// }

// async function getFollowedArtists(){
//     const data = await spotifyApi.getUserPlaylists({ limit : 50 })
//     return data.body.artists
// }

// async function getMySavedTracks(){
//     const data = await spotifyApi.getMySavedTracks({
//         limit : 50,
//         offset: 1
//       })
//     return data.body.items
// }

// async function getMySavedAlbums(){
//     const data = await spotifyApi.getMySavedTracks({
//         limit : 2,
//         offset: 1
//       })
//     return data.body.items
// }

// async function getMyTopArtists(){
//     const data = await spotifyApi.getMyTopArtists()
//     return data.body.items
// }

// async function getMyTopTracks(){
//     const data = await spotifyApi.getMyTopTracks({ limit : 50 })
//     return data.body.items
// }

// module.exports = {
//     getDataAboutMe : getDataAboutMe,
//     getMyPlaylists : getMyPlaylists,
//     getFollowedArtists : getFollowedArtists,
//     getMySavedTracks : getMySavedTracks,
//     getMySavedAlbums : getMySavedAlbums,
//     getMyTopArtists : getMyTopArtists,
//     getMyTopTracks : getMyTopTracks,
// }








const fs = require('fs')
const SpotifyWebApi = require('spotify-web-api-node')

class Me {

    constructor(){
        this.token = fs.existsSync(process.env.TOKEN_FILE) ? fs.readFileSync(process.env.TOKEN_FILE, 'utf8') : ""
        this.spotifyApi = new SpotifyWebApi()
        this.spotifyApi.setAccessToken(this.token)
    }

    async getAllMyAccountData(){
        this.getMe = await this.getDataAboutMe()
        this.getMyPlaylists = await this.getMyPlaylists(this.getMe.id)
        this.getFollowedArtists = await this.getFollowedArtists()
        this.getMySavedTracks = await this.getMySavedTracks()
        this.getMySavedAlbums = await this.getMySavedAlbums()
        this.getMyTopArtists = await this.getMyTopArtists()
        this.getMyTopTracks = await this.getMyTopTracks()
    }

    async getDataAboutMe(){
        return await this.spotifyApi.getMe()
    }
    
    async getMyPlaylists(idUser){
        const data = await this.spotifyApi.getUserPlaylists(idUser)
        return data.body.items
    }
    
    async getFollowedArtists(){
        const data = await this.spotifyApi.getUserPlaylists({ limit : 50 })
        return data.body.artists
    }
    
    async getMySavedTracks(){
        const data = await this.spotifyApi.getMySavedTracks({
            limit : 50,
            offset: 1
          })
        return data.body.items
    }
    
    async getMySavedAlbums(){
        const data = await this.spotifyApi.getMySavedTracks({
            limit : 2,
            offset: 1
          })
        return data.body.items
    }
    
    async getMyTopArtists(){
        const data = await this.spotifyApi.getMyTopArtists()
        return data.body.items
    }
    
    async getMyTopTracks(){
        const data = await this.spotifyApi.getMyTopTracks({ limit : 50 })
        return data.body.items
    }


}

module.exports = {
    instance : Me,
}