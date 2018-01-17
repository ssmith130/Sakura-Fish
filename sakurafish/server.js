require('dotenv').config();

var Twit = require('twit')
var config = require('./config');
var Twitter = new Twit(config); 
var fs = require('fs');
//var readFile = fs.readFileSync(sakuraFish, {encoding: 'base64'});
var message = "I'm going to post this everyday until you like it.";


var b64content = fs.readFileSync('./image/sakurafish.jpg', { encoding: 'base64' })
Twitter.post('media/upload', { media_data: b64content }, function (err, data, response) {

  var mediaIdStr = data.media_id_string
  var altText = "Sakura"
  var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }

  Twitter.post('media/metadata/create', meta_params, function (err, data, response) {
    if (!err) {
      var params = { status: message, media_ids: [mediaIdStr] }

      Twitter.post('statuses/update', params, function (err, data, response) {
        console.log(data)
      })
    }
  })
})


