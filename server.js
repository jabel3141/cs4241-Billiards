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

function writeUserDataExam1(username,f1,f2,f3,f4,f5,f6,f7,f8,ball_control,accuracy,positioning,exam1total) {
    var attempt=1;

    var ref = firebase.database().ref("https://cs4241-billiards.firebaseio.com/users");
    ref.once("value").then(function(snapshot) {
      var hasName = snapshot.hasChild(username); // true
      console.log(hasName);
      });



//
//     var query = firebase.database().ref("users").orderByKey();
//       query.once("value")
//         .then(function(snapshot) {
//           snapshot.forEach(function(childSnapshot) {
//             var key = childSnapshot.key; // "ada"
//             if(key==username)
//               console.log("here");
//               attempt = childSnapshot.child(username+"/attempts").val() + 1;
//               console.log(attempt)
//             // Cancel enumeration
//             return true;
//         });
// });



    // firebase.database().ref('users/'+username).set({
    //   attempts: attempt
    // })
    firebase.database().ref('users/' + username + '/Exam1/Attempt '+attempt).set({
      f1: f1,
      f2: f2,
      f3: f3,
      f4: f4,
      f5: f5,
      f6: f6,
      f7: f7,
      f8: f8,
      ball_control: ball_control,
      accuracy: accuracy,
      positioning: positioning,
      exam1total: exam1total

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
      handleSubmit(res,req);
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
  function handleSubmit(res, req) {
    var body = '';
    req.on('data', function (data) {
      body += data;
      if (body.length > 1e6) {
        req.connection.destroy();
      }
    });
    req.on('end', function () {
      var post = qs.parse(body);
      post.scores = post.scores.split(',').map(Number);

      var f1= post.scores[0];
      var f2= post.scores[1];
      var f3= post.scores[2];
      var f4= post.scores[3];
      var f5= post.scores[4];
      var f6= post.scores[5];
      var f7= post.scores[6];
      var f8= post.scores[7];
      var ball_control= post.scores[1]+post.scores[2]+post.scores[3]+post.scores[4]+post.scores[6];
      var accuracy= post.scores[0]+post.scores[5];
      var positioning= post.scores[7];

      var exam1total= post.scores[0]+post.scores[1]+post.scores[2]+post.scores[3]+post.scores[4]+post.scores[5]+post.scores[6]+post.scores[7];

      writeUserDataExam1(post.user,f1,f2,f3,f4,f5,f6,f7,f8,ball_control,accuracy,positioning,exam1total)

      res.end()
    });
  }
