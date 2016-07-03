//## Braintree detskut
//### Sandbox
//Merchant ID: 3gv7c5tq5q7hxrcs
//Public key: gksd667wsgn35wjp
//Private key: 2c01703b7daffd7352eeaada7a4a95e5

var express = require('express')
var http = require('http')
var https = require('https')
var fs = require('fs')
var braintree = require("braintree");
var qs = require('querystring');
var firebase = require('firebase')

var JPS = {} //The global.

var firebaseConfig = {
  apiKey: "AIzaSyCq544Yq7EEY-5spIe1oFCe8gkOzRkS5ak",
  authDomain: "joogakoulusilta-projekti.firebaseapp.com",
  databaseURL: "https://joogakoulusilta-projekti.firebaseio.com",
  storageBucket: "joogakoulusilta-projekti.appspot.com",
};
firebase.initializeApp(firebaseConfig);
JPS.TransactionRef = firebase.database().ref('/transactions/')
JPS.UsersRef = firebase.database().ref('/users/')
JPS.ShopItemsRef = firebase.database().ref('/shopItems')

JPS.gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "3gv7c5tq5q7hxrcs",
  publicKey: "gksd667wsgn35wjp",
  privateKey: "2c01703b7daffd7352eeaada7a4a95e5"
});


process.on('exit', (code) => {
  console.log("Process exited with code:", code);
})

process.on('uncaughtException', (err) => {
  console.log("Caught exception:", err);
})

var app = express();

/*
const options = {
  key: fs.readFileSync('keys/jooga-key.pem'),
  cert: fs.readFileSync('keys/jooga-cert.pem')
};
*/

http.createServer(app).listen(3000, (err) => {
  if(err) throw err;
  console.log("Listenig on 3000");
});
//https.createServer(options, app).listen(443);

app.get('/clientToken', (req, res) => {
  console.log("ClientToken requested: ", req);
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Access-Control-Allow-Origin', '*');
  JPS.gateway.clientToken.generate({}, (err, response) => {
        if (err) {
          console.error(err);
          console.error(response);
          res.statusCode = 500;
          res.end(err);
        }
        else {
          console.log("Sending client token: ", response.clientToken);
          res.end(response.clientToken);
        }
    })
})

app.post('/checkout', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Access-Control-Allow-Origin', '*');
  JPS.body = '';
  req.on('data', (data) => {
    JPS.body += data;
    // Too much POST data, kill the connection!
    // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
    if (JPS.body.length > 1e6) req.connection.destroy();
  });
  req.on('end', () => {
    JPS.post = qs.parse(JPS.body);
    JPS.nonceFromTheClient = JPS.post.payment_method_nonce;
    JPS.currentUserKey = JPS.post.current_user;
    JPS.shopItemKey = JPS.post.item_key;
    console.log("POST:", JPS.post);

    JPS.ShopItemsRef.orderByKey().equalTo(JPS.shopItemKey).once('child_added', snapshot => {
      JPS.shopItem = snapshot.val();
      console.log("Shopitem:", JPS.shopItem);
      JPS.gateway.transaction.sale({
                  amount: JPS.shopItem.price,
                  paymentMethodNonce: JPS.nonceFromTheClient,
                  options: {
                    submitForSettlement: true
                  }
              },  (err, result) => {
                if(err) {
                  console.error(err);
                  res.statusCode = 500;
                } else {
                  res.statusCode = 200;
                }
                res.end();

                JPS.TransactionRef.push({
                  user: JPS.currentUserKey,
                  token: {
                    key: JPS.shopItem.token,
                    used: false
                  },
                  error: err ? err : {code: 0},
                  details: result
                }
                  , (error) => {
                    if(error){
                        console.error("Transaction write to database failed", error);
                    }
                  })
              })
            }, error => {
      console.error("Failed reading shopItem details: ", error);
    })
  })
})
