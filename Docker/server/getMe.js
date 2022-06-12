const fs = require('fs')
const SpotifyWebApi = require('spotify-web-api-node')
const token = fs.readFileSync('token.json', 'utf8')
const spotifyApi = new SpotifyWebApi()
spotifyApi.setAccessToken(token)

async function getDataAboutMe(){
    let me = await spotifyApi.getMe()
    console.log(me)
    return me
    // getMyPlaylists(me.body.id)
}

async function getMyPlaylists(idUser){
    const data = await spotifyApi.getUserPlaylists(idUser)
    console.log(data.body.items)
}

module.exports = {
    getDataAboutMe : getDataAboutMe,
}

getDataAboutMe()
