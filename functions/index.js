const functions = require('firebase-functions');
var admin = require("firebase-admin");
var cors = require('cors')({origin: true});

var serviceAccount = require("./hearth-42ec4-firebase-adminsdk-f9xc2-6f6ae6bc20.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://hearth-42ec4.firebaseio.com"
});

var config = {
	apiKey: "AIzaSyDX1ab87f8lUeOwGB_jmII1OZk4j4Ks-sY",
	authDomain: "hearth-42ec4.firebaseapp.com",
	databaseURL: "https://hearth-42ec4.firebaseio.com",
	projectId: "hearth-42ec4",
	storageBucket: "hearth-42ec4.appspot.com",
	messagingSenderId: "180938106841"
};

exports.verify = functions.https.onRequest((req, res) => { cors(req, res, () => {
  admin.firestore().doc('config/live').get().then((doc) => {
    let keys = doc.get('keys');
    if(req.query.key && keys.includes(req.query.key))
      res.send({result: true});
    else 
      res.send({result: false});
  });
})});