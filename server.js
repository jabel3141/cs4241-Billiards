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
var i;
// writeUserData('123', 'lane', 'l@a.a', 'imgurl')

function writeUserDataExam1(username, name, exam1scores) {
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
          ball_control: exam1scores[1]+exam1scores[2]+exam1scores[3]+exam1scores[4]+exam1scores[6],
          accuracy: exam1scores[0]+exam1scores[5],
          positioning: exam1scores[7],

          exam1total: exam1scores[0]+exam1scores[1]+exam1scores[2]+exam1scores[3]
          +exam1scores[4]+exam1scores[5]+exam1scores[6]+exam1scores[7],

          /*
          exam_total: exam1scores[0]+exam1scores[1]+exam1scores[2]+exam1scores[3]
          +exam1scores[4]+exam1scores[5]+exam1scores[6]+exam1scores[7]+exam2scores[0]+exam2scores[1]+exam2scores[2]+
          exam2scores[3]+exam2scores[4]+exam2scores[5]+exam2scores[6]+exam2scores[7]+exam2scores[8]+exam2scores[9]
          */
        });
}

function writeUserDataExam2(username, name, exam2scores) {
    firebase.database().ref('users/' + username).set({
          username: username,
          name: name,
          
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
          complex_situation_ability: exam2scores[0]+exam2scores[1]+exam2scores[2]+exam2scores[3],
          safe_ability: exam2scores[4],
          special_shot_ability: exam2scores[5]+exam2scores[6]+exam2scores[7]+exam2scores[8],
          break_ability: exam2scores[9],

          exam2total: exam2scores[0]+exam2scores[1]+exam2scores[2]+exam2scores[3]+exam2scores[4]+
          exam2scores[5]+exam2scores[6]+exam2scores[7]+exam2scores[8]+exam2scores[9],

          /*exam_total: exam1scores[0]+exam1scores[1]+exam1scores[2]+exam1scores[3]
          +exam1scores[4]+exam1scores[5]+exam1scores[6]+exam1scores[7]+exam2scores[0]+exam2scores[1]+exam2scores[2]+
          exam2scores[3]+exam2scores[4]+exam2scores[5]+exam2scores[6]+exam2scores[7]+exam2scores[8]+exam2scores[9]
          */
        });
}

// writeUserData("thagen","Tom Hagen", [1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1])

//curl 'https://cs4241-billiards.firebaseio.com/users'
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

    case '/examFundamentals.html':
      sendFile(res, 'examFundamentals.html')
      break

    case '/examSkills.html':
      sendFile(res, 'examSkills.html')
      break

    case '/profiles.html':
      sendFile(res, 'profiles.html')
      break

    case '/searchProfile.html':
      sendFile(res, 'searchProfile.html')
      break

    case '/style.css':
      sendFile(res, 'style.css', 'text/css')
      break

    case '/submitExam':

      break
    //case '/js/scripts.js':
      //sendFile(res, 'scripts.js', 'text/javascript')
      //break

    /////////////////////// IMAGES //////////////////////////////////
    case '/img/exam1/F1.jpg':
      sendFile(res, '/img/exam1/F1.jpg', 'image/jpg')
      break
    case '/img/exam1/F2.jpg':
      sendFile(res, '/img/exam1/F2.jpg', 'image/jpg')
      break
    case '/img/exam1/F3.jpg':
      sendFile(res, '/img/exam1/F3.jpg', 'image/jpg')
      break
    case '/img/exam1/F4.jpg':
      sendFile(res, '/img/exam1/F4.jpg', 'image/jpg')
      break
    case '/img/exam1/F5.jpg':
      sendFile(res, '/img/exam1/F5.jpg', 'image/jpg')
      break
    case '/img/exam1/F6.jpg':
      sendFile(res, '/img/exam1/F6.jpg', 'image/jpg')
      break
    case '/img/exam1/F7.jpg':
      sendFile(res, '/img/exam1/F7.jpg', 'image/jpg')
      break
    case '/img/exam1/F8.jpg':
      sendFile(res, '/img/exam1/F8.jpg', 'image/jpg')
      break

    case '/img/exam_2/s1.jpg':
      sendFile(res, '/img/exam_2/s1.jpg', 'image/jpg')
      break
    case '/img/exam_2/s2.jpg':
      sendFile(res, '/img/exam_2/s2.jpg', 'image/jpg')
      break
    case '/img/exam_2/s3.jpg':
      sendFile(res, '/img/exam_2/s3.jpg', 'image/jpg')
      break
    case '/img/exam_2/s4.jpg':
      sendFile(res, '/img/exam_2/s4.jpg', 'image/jpg')
      break
    case '/img/exam_2/s5.jpg':
      sendFile(res, '/img/exam_2/s5.jpg', 'image/jpg')
      break
    case '/img/exam_2/s6.jpg':
      sendFile(res, '/img/exam_2/s6.jpg', 'image/jpg')
      break
    case '/img/exam_2/s7.jpg':
      sendFile(res, '/img/exam_2/s7.jpg', 'image/jpg')
      break
    case '/img/exam_2/s8.jpg':
      sendFile(res, '/img/exam_2/s8.jpg', 'image/jpg')
      break
    case '/img/exam_2/s9.jpg':
      sendFile(res, '/img/exam_2/s9.jpg', 'image/jpg')
      break
    case '/img/exam_2/s10.jpg':
      sendFile(res, '/img/exam_2/s10.jpg', 'image/jpg')
      break
    case '/img/exam_2/s11.jpg':
      sendFile(res, '/img/exam_2/s11.jpg', 'image/jpg')
      break
    case '/img/exam_2/s12.jpg':
      sendFile(res, '/img/exam_2/s12.jpg', 'image/jpg')
      break
    case '/img/exam_2/s13.jpg':
      sendFile(res, '/img/exam_2/s13.jpg', 'image/jpg')
      break
    case '/img/exam_2/s14.jpg':
      sendFile(res, '/img/exam_2/s14.jpg', 'image/jpg')
      break
    /////////////////////// END - IMAGES //////////////////////////////////
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
