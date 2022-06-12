const express = require('express')
const fs = require('fs')
const SpotifyWebApi = require('spotify-web-api-node')
const app = express()
const port = 3000
// const getMe = require("./getMe.js");
const Spotify = require("./spotify.js");
let spotify = new Spotify.instance()

app.get('/', (req, res) => {
  res.redirect(spotify.redirectToCallback())
})

app.get('/auth', async (req, res) => {
  let authResponse = await spotify.auth(req)
  res.send(`${authResponse.state} : ${authResponse.message}`)
  // const error = req.query.error
  // const code = req.query.code
  // if (error) {
  //   console.log('Auth Error: ', error)
  //   res.send('Auth Error: ', error)
  //   return 
  // }

  // try {
  //   const resultAuthrizationCodeGrantt = await spotifyApi.authorizationCodeGrant(code)
  //   const accessToken = resultAuthrizationCodeGrantt.body['access_token']
  //   spotifyApi.setAccessToken(accessToken)
  //   console.log('Access Token: ', accessToken)
  //   const refreshToken = resultAuthrizationCodeGrantt.body['refresh_token']
  //   spotifyApi.setRefreshToken(refreshToken)
  //   console.log('Refresh Token: ', refreshToken)

  //   const exprireIn = resultAuthrizationCodeGrantt.body['expires_in']
  //   res.send('Success')

  //   setInterval(async () => {
  //     const data = await spotifyApi.refreshAccessToken()
  //     const accessToken = data.body['access_token']
  //     // console.log('Access Token Refreshed: ', accessToken)
  //     spotifyApi.setAccessToken(accessToken)

  //     fs.readFile(tokenFile, (err, data) => {
  //       if(!err){
  //         fs.writeFile(tokenFile, '', ()=>{
  //           fs.writeFile(tokenFile, accessToken, ()=>{console.log('oui')})
  //         })
  //       }
  //     })
  //   },exprireIn / 2 * 1000)

  // } catch (error) {
  //   console.log('Error: ', error)
  //   res.send(`Error:  ${error}`)
  // }

})

app.get('/getMe', async (req, res) => {
  res.send(await getMe.getDataAboutMe())
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

class SpotifyManagement{
  constructor(){
    this.spotifyApi = new SpotifyWebApi({
      clientId: 'bbd636c28a7f4b9f875948046b3021f6',
      clientSecret: 'f03f9ac87576486d82168c602fd7cea3',
      redirectUri: 'http://localhost:3000/auth'
    });
  }
}