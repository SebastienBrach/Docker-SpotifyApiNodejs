const fs = require('fs')
const SpotifyWebApi = require('spotify-web-api-node')
const dotenv = require('dotenv').config();

class Album {

    constructor(){
        this.token = fs.existsSync(process.env.TOKEN_FILE) ? fs.readFileSync(process.env.TOKEN_FILE, 'utf8') : ""
        this.spotifyApi = new SpotifyWebApi()
        this.spotifyApi.setAccessToken(this.token)
    }

    async getAlbum(id){
        const data = await this.spotifyApi.getAlbum(id)
        return data.body
    }

    async getAlbumTracks(id){
        try {
            const data = await this.spotifyApi.getAlbumTracks(id, { limit : 50, offset : 1 })
            console.log(data)
        } catch (err) {
            console.log(err)
        }
    }

    async addToSavedAlbums(id){
        const data = await this.spotifyApi.addToMySavedAlbums(id)
        return data.body
    }

    async removeFromSavedAlbums(id){
        const data = await this.spotifyApi.removeFromMySavedAlbums(id)
        return data.body
    }
    
}

module.exports = {
    instance : Album,
}