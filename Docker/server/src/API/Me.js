const fs = require('fs')
const SpotifyWebApi = require('spotify-web-api-node')
const dotenv = require('dotenv').config();

class Me {

    constructor(){
        this.token = fs.existsSync(process.env.TOKEN_FILE) ? fs.readFileSync(process.env.TOKEN_FILE, 'utf8') : ""
        this.spotifyApi = new SpotifyWebApi()
        this.spotifyApi.setAccessToken(this.token)
    }

    async getAllMyAccountData(){
        console.log('oui')
        this.getMe = await this.getMyAccountData()
        console.log(this.getMe)
        this.getMyPlaylists = await this.getMyPlaylists(this.getMe.id)
        this.getMyFollowedArtists = await this.getMyFollowedArtists()
        this.getMySavedTracks = await this.getMySavedTracks()
        this.getMySavedAlbums = await this.getMySavedAlbums()
        this.getMyTopArtists = await this.getMyTopArtists()
        this.getMyTopTracks = await this.getMyTopTracks()
    }

    async getMyAccountData(){
        const data = await this.spotifyApi.getMe()
        return data.body
    }
    
    async getMyPlaylists(idUser){
        const data = await this.spotifyApi.getUserPlaylists(idUser)
        return data.body.items
    }
    
    async getMyFollowedArtists(){
        const data = await this.spotifyApi.getFollowedArtists({ 
            limit : 50 
        })
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
        const data = await this.spotifyApi.getMySavedAlbums({
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