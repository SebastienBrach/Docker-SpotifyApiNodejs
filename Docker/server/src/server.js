const bodyParser = require('body-parser');
const express = require('express')
const app = express()
const port = 3000
const log = require("./Config/log.js");
const Spotify = require("./Auth/SpotifyAPIAuth.js");
const spotify = new Spotify.instance()


const meRoute = require("./Routes/Me.js");
app.use(process.env.ME_BASE_ROUTE, meRoute);


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use((req, res, next) => {
  log.info("SERVER", `METHOD ${req.method} - URL ${req.url} - IP ${req.socket.remoteAddress}`);

  res.on('finish', () => {
    log.info("SERVER", `METHOD ${req.method} - URL ${req.url} - IP ${req.socket.remoteAddress} - STATUS ${res.statusCode}`);
  });
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'GET PATC DELETE POST PUT');
      return res.status(200).send({});
  }
});

app.use((req, res, next) => {
  const error = new Error('Not Found');
  console.log(error)
  return res.status(404).send({ error: error.message });
});


app.get('/', (req, res) => {
  res.redirect(spotify.redirectToCallback())
})

app.get(process.env.AUTH_CALLBACK, async (req, res) => {
  await spotify.auth(req)
  res.redirect(process.env.ME_BASE_ROUTE+process.env.ME_GET_ACCOUNT)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})