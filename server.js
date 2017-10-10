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
    handleSubmitExam(res,req);
    break

    case '/search':
    searchUsers(res,req,uri);
    break

    case '/setUser':
    setCurrentUser(res,req,uri);
    break

    case '/getUserList':
    res.end(JSON.stringify(searchedUsers))
    break

    case '/getUser':
    res.end(JSON.stringify(currentUserData))
    //case '/js/scripts.js':
    //sendFile(res, 'scripts.js', 'text/javascript')
    //break

    /////////////////////// IMAGES //////////////////////////////////
    case '/img/home/1.png':
    sendFile(res, 'img/home/1.png', 'image/png')
    break
    case '/img/home/2.png':
    sendFile(res, 'img/home/2.png', 'image/png')
    break
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
function handleSubmitExam(res, req) {
  var body = '';
  req.on('data', function (data) {
    body += data;
    if (body.length > 1e6) {
      req.connection.destroy();
    }
  });
  req.on('end', function () {
    console.log("here");
    var post = qs.parse(body);
    var examScores = post.scores.split(',').map(Number);
    var username = post.user;
    var whichExam = parseInt(post.exam)
    var totalscore = 0;
    var combinedScores=[];

    switch(whichExam){
      case 1:
      combinedScores[0] = examScores[1]+examScores[2]+examScores[3]+examScores[4]+examScores[6];
      combinedScores[1] = examScores[0]+examScores[5];
      combinedScores[2] = examScores[7];
      examScores.forEach(function (e){
        totalscore += e;
      });
      combinedScores[3] = totalscore;
      break;

      case 2:
       combinedScores[0] = examScores[0]+ examScores[1]+examScores[2]+examScores[3]
       combinedScores[1] = examScores[4];
       combinedScores[2] = examScores[5]+ examScores[6]+examScores[7]+examScores[8];
       combinedScores[3] = examScores[9];
      examScores.forEach(function (e){
        totalscore += e;
      })
      combinedScores[4] = totalscore
      break;
    }

    writeUserData(username,examScores,combinedScores,whichExam)
    res.end()
  });
}

function writeUserData(username,examScores,combinedScores, whichExam) {
  var attempt=1;

  var ref = firebase.database().ref("/users/");
  ref.once("value").then(function(snapshot) {
    var hasName = snapshot.hasChild(username); // true
    if(hasName){
      switch(whichExam){
        case 1:
        attempt = snapshot.child(username+'/Exam1/').numChildren()+1;
        break;
        case 2:
        attempt = snapshot.child(username+'/Exam2/').numChildren()+1;
        break;
      }
    }
    console.log("Exam "+whichExam+ "      Attempt: "+attempt);

    switch(whichExam){
      case 1:
      firebase.database().ref('users/'+username+'/Exam1/Attempt '+attempt).set({
        f1: examScores[0],
        f2: examScores[1],
        f3: examScores[2],
        f4: examScores[3],
        f5: examScores[4],
        f6: examScores[5],
        f7: examScores[6],
        f8: examScores[7],

        ballControl: combinedScores[0],
        accuracy: combinedScores[1],
        positioning: combinedScores[2],
        total: combinedScores[3]
      })
      break;
      case 2:
      firebase.database().ref('users/'+username+'/Exam2/Attempt '+attempt).set({
        s1: examScores[0],
        s2: examScores[1],
        s3: examScores[2],
        s4: examScores[3],
        s5: examScores[4],
        s6: examScores[5],
        s7: examScores[6],
        s8: examScores[7],
        s9: examScores[8],
        s10: examScores[9],

        complexSituationAbility: combinedScores[0],
        safeAbility: combinedScores[1],
        specialShotAbility: combinedScores[2],
        breakAbility: combinedScores[3],
        total: combinedScores[4]
      }
    )
  }
})}

var currentUserData = null
var allUsers = []
var searchedUsers = []

makeUserList()
console.log(searchedUsers)

function makeUserList(){
  //console.log("here")

  var ref = firebase.database().ref("users").orderByKey();
  ref.once("value").then(function(snapshot) {
    var user = ''
    var userData = null

    snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key;
      var childData = childSnapshot.val();

      userData = {"username": key, "userData": childData};
      //console.log(userData)

      allUsers.push(userData)
    });
    //console.log(allUsers)
    searchedUsers = allUsers
    //  console.log(searchedUsers)
  });
}


function setCurrentUser(res, req, uri){
  var postdata = ''
  req.on('data', function(d) {
    postdata += d
  });
  req.on('end', function() {
    var data = qs.parse(postdata)

    var ref = firebase.database().ref("users").orderByKey();
    ref.once("value").then(function(snapshot) {
      var user = ''
      var userData = null

      snapshot.forEach(function(childSnapshot) {
        var key = childSnapshot.key;
        var childData = childSnapshot.val();

        if(key.toLowerCase() == data.username.toLowerCase()){
          userData = {"username": key, "userData": childData};
          currentUserData = userData
        }

      })
      console.log(userData)
      currentUserData = userData
    });

    res.end()
  })
}


function searchUsers(res, req, uri){

  var postdata = ''
  req.on('data', function(d) {
    postdata += d
  });
  req.on('end', function() {
    var data = qs.parse(postdata)

    var ref = firebase.database().ref("/users/");
    ref.once("value").then(function(snapshot) {
      var search = []
      snapshot.forEach(function(childSnapshot){
        var username = childSnapshot.key;
        if(username.toLowerCase().includes(data.searchName.toLowerCase())){
          search.push({"username": username});
        }

      })
      console.log(search);
      searchedUsers = search
      res.end()
    });


  })
}

function endres(res){
  console.log("here")
  res.end()
}
