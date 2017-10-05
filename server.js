var http = require('http')
  , qs   = require('querystring')
  , fs   = require('fs')
  , url  = require('url')
  , firebase = require("firebase")
  , port = 8080


  var config = {
     apiKey: "AIzaSyBQxD4DSfJ31NEgQv8fUJoEmEhl5yq5JZo",
     authDomain: "cs4241-billiards.firebaseapp.com",
     databaseURL: "https://cs4241-billiards.firebaseio.com",
     projectId: "cs4241-billiards",
     storageBucket: "cs4241-billiards.appspot.com",
     messagingSenderId: "622381521618"
   };
   firebase.initializeApp(config);

// writeUserData('123', 'lane', 'l@a.a', 'imgurl')

function writeUserData(username, name, exam1scores, exam2scores) {
    firebase.database().ref('users/' + username).set({
          username: username,
          name: name,
          f1: exam1scores[0],
          f2: exam1scores[1],
          f3: exam1scores[2],
          f4: exam1scores[3],
          f5: exam1scores[4],
          f6: exam1scores[5],
          f7: exam1scores[6],
          f8: exam1scores[7],
          ball_control: f2+f3+f4+f5+f7,
          accuracy: f1+f6,
          positioning: f8,
          exam1total: ball_control+accuracy+positioning,
          s1: exam2scores[0],
          s2: exam2scores[1],
          s3: exam2scores[2],
          s4: exam2scores[3],
          s5: exam2scores[4],
          s6: exam2scores[5],
          s7: exam2scores[6],
          s8: exam2scores[7],
          s9: exam2scores[8],
          s10: exam2scores[9],
          complex_situation_ability: s1+s2+s3+s4,
          safe_ability: s5,
          special_shot_ability: s6+s7+s8+s9,
          break_ability: s10,
          exam2total: complex_situation_ability+safe_ability+break_ability+break_ability
          exam_total: exam1total+exam2total
        });
}


var server = http.createServer(function (req, res) {
  var uri = url.parse(req.url)
  // Note we no longer have an index.html file, but we handle the cases since that's what the browser will request
  // You'll need to modify the below to account for POSTs
  switch( uri.pathname ) {
    case '/':
      sendFile(res, 'index.html')
      break
    case '/index.html':
      sendFile(res, 'index.html')
      break
    case '/style.css':
      sendFile(res, 'style.css', 'text/css')
      break
    //case '/js/scripts.js':
      //sendFile(res, 'scripts.js', 'text/javascript')
      //break
    default:
      res.end('404 not found')
  }
})

server.listen(process.env.PORT || port)
console.log('listening on 8080')



function sendFile(res, filename, contentType) {
  contentType = contentType || 'text/html';

  fs.readFile(filename, function(error, content) {
    res.writeHead(200, {'Content-type': contentType})
    res.end(content, 'utf-8')
  })

}
