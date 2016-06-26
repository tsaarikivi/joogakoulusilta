//## Braintree detskut
//### Sandbox
//Merchant ID: 3gv7c5tq5q7hxrcs
//Public key: gksd667wsgn35wjp
//Private key: 2c01703b7daffd7352eeaada7a4a95e5


var http = require('http')
var braintree = require("braintree");
var qs = require('querystring');



var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "3gv7c5tq5q7hxrcs",
  publicKey: "gksd667wsgn35wjp",
  privateKey: "2c01703b7daffd7352eeaada7a4a95e5"
});



http.createServer(function(req, res) {

  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.url == '/clientToken') {
    console.log('request to root...');
    gateway.clientToken.generate({}, function (err, response) {
        console.log('response from braintree.');
        if (err) {
          console.error(err);
          console.error(response);
          res.statusCode = 300;
          res.end(err);
        }
        else {
          res.end(response.clientToken);
        }
    });
  }
  else if (req.url.search("checkout") > -1) {
      console.log(" checkout request received");

      if (req.method == 'POST') {
        var body = '';

        req.on('data', function (data) {
            body += data;
            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6)
                req.connection.destroy();
        });
        req.on('end', function () {
            var post = qs.parse(body); //TODO: use the post for input data!!
            console.log(body);
            var startPos = body.search("=") + 1;
            var nonceFromTheClient = body.slice(startPos,body.length);
            console.log("sendig for settlement.");
            gateway.transaction.sale({
                amount: '10.00', //TODO: get the amount from the request
                paymentMethodNonce: nonceFromTheClient,
                options: {
                  submitForSettlement: true
                }
            }, function (err, result) {
              if(err) {
                console.error(err);
                res.statusCode = 300;
              } else {
                res.statusCode = 200;
              }
              res.end();
              console.error(result);
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
