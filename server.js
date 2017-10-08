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
  var exam1attempt=1;

  var ref = firebase.database().ref("/users/");
  ref.once("value").then(function(snapshot) {
    var hasName = snapshot.hasChild(username); // true
    console.log(hasName);
    if(hasName){
      var hasAttempts = snapshot.hasChild(username+'/attempts/Exam 1');
      console.log(snapshot.child(username+'/attempts/Exam 1').val())
      if(hasAttempts){
        var addToAttempts = parseInt(snapshot.child(username+'/attempts/Exam 1/exam1attempts').val())
        console.log(addToAttempts)
        exam1attempt+=addToAttempts;
      }}
      updateDatabase1(exam1attempt,username,f1,f2,f3,f4,f5,f6,f7,f8,ball_control,accuracy,positioning,exam1total)
    });
  }

  function updateDatabase1(attempt,username,f1,f2,f3,f4,f5,f6,f7,f8,ball_control,accuracy,positioning,exam1total){
    firebase.database().ref('users/'+ username + '/attempts/Exam 1').set({
      exam1attempts: attempt
    })
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
    });
  }


  function writeUserDataExam2(username,s1,s2,s3,s4,s5,s6,s7,s8,s9,s10,complex_situation_ability, safe_ability,special_shot_ability,break_ability,exam2total) {
    var exam2attempt=1;

    var ref = firebase.database().ref("/users/");
    ref.once("value").then(function(snapshot) {
      var hasName = snapshot.hasChild(username); // true
      console.log(hasName);
      if(hasName){
        var hasAttempts = snapshot.hasChild(username+'/attempts/Exam 2');
        console.log(snapshot.child(username+'/attempts/exam2attempts').val())
        if(hasAttempts){
          var addToAttempts = parseInt(snapshot.child(username+'/attempts/Exam 2/exam2attempts').val())
          console.log(addToAttempts)
          exam2attempt+=addToAttempts;
        }
      }
        updateDatabase2(exam2attempt,username,s1,s2,s3,s4,s5,s6,s7,s8,s9,s10,complex_situation_ability, safe_ability,special_shot_ability,break_ability,exam2total)
      }
    );

    }

    function updateDatabase2(exam2attempt,username,s1,s2,s3,s4,s5,s6,s7,s8,s9,s10,complex_situation_ability, safe_ability,special_shot_ability,break_ability,exam2total){
      firebase.database().ref('users/'+ username + '/attempts/Exam 2').set({
        exam2attempts: exam2attempt
      })
      firebase.database().ref('users/' + username + '/Exam2/Attempt '+exam2attempt).set({
        s1: s1,
        s2: s2,
        s3: s3,
        s4: s4,
        s5: s5,
        s6: s6,
        s7: s7,
        s8: s8,
        s9: s9,
        s10: s10,

        complex_situation_ability: complex_situation_ability,
        safe_ability: safe_ability,
        special_shot_ability: special_shot_ability,
        break_ability: break_ability,
        exam2total: exam2total
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

        case '/submitExam1':
        handleSubmitExam1(res,req);
        break

        case '/submitExam2':
        handleSubmitExam2(res,req);
        break
        //case '/js/scripts.js':
        //sendFile(res, 'scripts.js', 'text/javascript')
        //break

        /////////////////////// IMAGES //////////////////////////////////
        case '/img/exam1/F1.jpg':
        sendFile(res, 'img/exam1/F1.jpg', 'image/jpg')
        break
        case '/img/exam1/F2.jpg':
        sendFile(res, 'img/exam1/F2.jpg', 'image/jpg')
        break
        case '/img/exam1/F3.jpg':
        sendFile(res, 'img/exam1/F3.jpg', 'image/jpg')
        break
        case '/img/exam1/F4.jpg':
        sendFile(res, 'img/exam1/F4.jpg', 'image/jpg')
        break
        case '/img/exam1/F5.jpg':
        sendFile(res, 'img/exam1/F5.jpg', 'image/jpg')
        break
        case '/img/exam1/F6.jpg':
        sendFile(res, 'img/exam1/F6.jpg', 'image/jpg')
        break
        case '/img/exam1/F7.jpg':
        sendFile(res, 'img/exam1/F7.jpg', 'image/jpg')
        break
        case '/img/exam1/F8.jpg':
        sendFile(res, 'img/exam1/F8.jpg', 'image/jpg')
        break

        case '/img/exam_2/s1.jpg':
        sendFile(res, 'img/exam_2/s1.jpg', 'image/jpg')
        break
        case '/img/exam_2/s2.jpg':
        sendFile(res, 'img/exam_2/s2.jpg', 'image/jpg')
        break
        case '/img/exam_2/s3.jpg':
        sendFile(res, 'img/exam_2/s3.jpg', 'image/jpg')
        break
        case '/img/exam_2/s4.jpg':
        sendFile(res, 'img/exam_2/s4.jpg', 'image/jpg')
        break
        case '/img/exam_2/s5.jpg':
        sendFile(res, 'img/exam_2/s5.jpg', 'image/jpg')
        break
        case '/img/exam_2/s6.jpg':
        sendFile(res, 'img/exam_2/s6.jpg', 'image/jpg')
        break
        case '/img/exam_2/s7.jpg':
        sendFile(res, 'img/exam_2/s7.jpg', 'image/jpg')
        break
        case '/img/exam_2/s8.jpg':
        sendFile(res, 'img/exam_2/s8.jpg', 'image/jpg')
        break
        case '/img/exam_2/s9.jpg':
        sendFile(res, 'img/exam_2/s9.jpg', 'image/jpg')
        break
        case '/img/exam_2/s10.jpg':
        sendFile(res, 'img/exam_2/s10.jpg', 'image/jpg')
        break
        case '/img/exam_2/s11.jpg':
        sendFile(res, 'img/exam_2/s11.jpg', 'image/jpg')
        break
        case '/img/exam_2/s12.jpg':
        sendFile(res, 'img/exam_2/s12.jpg', 'image/jpg')
        break
        case '/img/exam_2/s13.jpg':
        sendFile(res, 'img/exam_2/s13.jpg', 'image/jpg')
        break
        case '/img/exam_2/s14.jpg':
        sendFile(res, 'img/exam_2/s14.jpg', 'image/jpg')
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
    function handleSubmitExam1(res, req) {
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
    function handleSubmitExam2(res, req) {
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

        var s1= post.scores[0];
        var s2= post.scores[1];
        var s3= post.scores[2];
        var s4= post.scores[3];
        var s5= post.scores[4];
        var s6= post.scores[5];
        var s7= post.scores[6];
        var s8= post.scores[7];
        var s9= post.scores[8];
        var s10= post.scores[9];

        var complex_situation_ability= s1+s2+s3+s4
        var safe_ability = s5
        var special_shot_ability = s6+s7+s8+s9
        var break_ability = s10

        var exam2total =complex_situation_ability+safe_ability+special_shot_ability+break_ability;

        writeUserDataExam2(post.user,s1,s2,s3,s4,s5,s6,s7,s8,s9,s10,complex_situation_ability,safe_ability,special_shot_ability,break_ability,exam2total);


        res.end()
      });
    }
