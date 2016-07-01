//## Braintree detskut
//### Sandbox
//Merchant ID: 3gv7c5tq5q7hxrcs
//Public key: gksd667wsgn35wjp
//Private key: 2c01703b7daffd7352eeaada7a4a95e5


var http = require('http')
var braintree = require("braintree");
var qs = require('querystring');
var firebase = require('firebase')

var firebaseConfig = {
  apiKey: "AIzaSyCq544Yq7EEY-5spIe1oFCe8gkOzRkS5ak",
  authDomain: "joogakoulusilta-projekti.firebaseapp.com",
  databaseURL: "https://joogakoulusilta-projekti.firebaseio.com",
  storageBucket: "joogakoulusilta-projekti.appspot.com",
};
firebase.initializeApp(firebaseConfig);
const TransactionRef = firebase.database().ref('/transactions/')

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "3gv7c5tq5q7hxrcs",
  publicKey: "gksd667wsgn35wjp",
  privateKey: "2c01703b7daffd7352eeaada7a4a95e5"
});


http.createServer((req, res) => {

  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.url == '/clientToken') {
    gateway.clientToken.generate({}, (err, response) => {
        if (err) {
          console.error(err);
          console.error(response);
          res.statusCode = 500;
          res.end(err);
        }
        else {
          res.end(response.clientToken);
        }
    });
  }
  else if (req.url.search("checkout") > -1) {

      if (req.method == 'POST') {
        var body = '';
        req.on('data', (data) => {
            body += data;
            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6)
                req.connection.destroy();
        });
        req.on('end', () => {
            var post = qs.parse(body);

            var nonceFromTheClient = post.payment_method_nonce;
            var price = post.item_price;
            var currentUser = post.current_user;

            gateway.transaction.sale({
                amount: price,
                paymentMethodNonce: nonceFromTheClient,
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

              TransactionRef.push({
                user: currentUser,
                error: err ? err : {code: 0},
                details: result
              }
                , (error) => {
                  if(error){
                      console.error("Transaction write to database failed", error);
                  }
                }
              );
            });

        });
    }



  }
  // This endpoint is hit when the browser is requesting bundle.js from the page above
  else {
    res.statusCode = 404;
    res.end();
  }

// The http server listens on port 3000
}).listen(3000, function(err) {
  if (err) throw err
  console.log('Listening on 3000...')
})
