//## Braintree detskut
//### Sandbox
//Merchant ID: 3gv7c5tq5q7hxrcs
//Public key: gksd667wsgn35wjp
//Private key: 2c01703b7daffd7352eeaada7a4a95e5


var http = require('http')
var braintree = require("braintree");

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "3gv7c5tq5q7hxrcs",
  publicKey: "gksd667wsgn35wjp",
  privateKey: "2c01703b7daffd7352eeaada7a4a95e5"
});

//const token = 'eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiJiNGEyZmY2NTFlZGJiZWQxZjc1NWNmMGQzMGQ0M2ExYTkyMmY0ZTVkNWJjY2M0YmNhMzA3ZjU0YmVjNGVmNjQ4fGNyZWF0ZWRfYXQ9MjAxNS0wMi0wMlQyMDo1Njo0My43MTY4NDE5OTMrMDAwMFx1MDAyNm1lcmNoYW50X2lkPWRjcHNweTJicndkanIzcW5cdTAwMjZwdWJsaWNfa2V5PTl3d3J6cWszdnIzdDRuYzgiLCJjb25maWdVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvZGNwc3B5MmJyd2RqcjNxbi9jbGllbnRfYXBpL3YxL2NvbmZpZ3VyYXRpb24iLCJjaGFsbGVuZ2VzIjpbXSwicGF5bWVudEFwcHMiOltdLCJjbGllbnRBcGlVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvZGNwc3B5MmJyd2RqcjNxbi9jbGllbnRfYXBpIiwiYXNzZXRzVXJsIjoiaHR0cHM6Ly9hc3NldHMuYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhdXRoVXJsIjoiaHR0cHM6Ly9hdXRoLnZlbm1vLnNhbmRib3guYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhbmFseXRpY3MiOnsidXJsIjoiaHR0cHM6Ly9jbGllbnQtYW5hbHl0aWNzLnNhbmRib3guYnJhaW50cmVlZ2F0ZXdheS5jb20ifSwidGhyZWVEU2VjdXJlRW5hYmxlZCI6dHJ1ZSwidGhyZWVEU2VjdXJlIjp7Imxvb2t1cFVybCI6Imh0dHBzOi8vYXBpLnNhbmRib3guYnJhaW50cmVlZ2F0ZXdheS5jb206NDQzL21lcmNoYW50cy9kY3BzcHkyYnJ3ZGpyM3FuL3RocmVlX2Rfc2VjdXJlL2xvb2t1cCJ9LCJwYXlwYWxFbmFibGVkIjp0cnVlLCJwYXlwYWwiOnsiZGlzcGxheU5hbWUiOiJBY21lIFdpZGdldHMsIEx0ZC4gKFNhbmRib3gpIiwiY2xpZW50SWQiOm51bGwsInByaXZhY3lVcmwiOiJodHRwOi8vZXhhbXBsZS5jb20vcHAiLCJ1c2VyQWdyZWVtZW50VXJsIjoiaHR0cDovL2V4YW1wbGUuY29tL3RvcyIsImJhc2VVcmwiOiJodHRwczovL2Fzc2V0cy5icmFpbnRyZWVnYXRld2F5LmNvbSIsImFzc2V0c1VybCI6Imh0dHBzOi8vY2hlY2tvdXQucGF5cGFsLmNvbSIsImRpcmVjdEJhc2VVcmwiOm51bGwsImFsbG93SHR0cCI6dHJ1ZSwiZW52aXJvbm1lbnROb05ldHdvcmsiOnRydWUsImVudmlyb25tZW50Ijoib2ZmbGluZSIsInVudmV0dGVkTWVyY2hhbnQiOmZhbHNlLCJtZXJjaGFudEFjY291bnRJZCI6InN0Y2gybmZkZndzenl0dzUiLCJjdXJyZW5jeUlzb0NvZGUiOiJVU0QifSwiY29pbmJhc2VFbmFibGVkIjpmYWxzZSwibWVyY2hhbnRJZCI6ImRjcHNweTJicndkanIzcW4iLCJ2ZW5tbyI6Im9mZmxpbmUiLCJhcHBsZVBheSI6eyJzdGF0dXMiOiJtb2NrIiwiY291bnRyeUNvZGUiOiJVUyIsImN1cnJlbmN5Q29kZSI6IlVTRCIsIm1lcmNoYW50SWRlbnRpZmllciI6Im1lcmNoYW50LmNvbS5icmFpbnRyZWVwYXltZW50cy5kZXYtZGNvcGVsYW5kIiwic3VwcG9ydGVkTmV0d29ya3MiOlsidmlzYSIsIm1hc3RlcmNhcmQiLCJhbWV4Il19fQ=='

http.createServer(function(req, res) {

  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.url == '/clientToken') {
    console.log('request to root...');
    gateway.clientToken.generate({}, function (err, response) {
        console.log('response from braintree.');
        res.end(response.clientToken);
    });
  }result
  else if (req.url.search("checkout") > -1) {
      console.log(" checkout request received");
      console.log(req);
      console.log(req.url);
      let startPos = req.url.search("=") + 1;
      var nonceFromTheClient = req.url.slice(startPos,req.url.length);
      console.log(nonceFromTheClient);
      console.log("sendig for settlement.");
      gateway.transaction.sale({
          amount: '10.00', //TODO: get the amount from the request
          paymentMethodNonce: nonceFromTheClient,  //TODO: get the nonce from the request (change to POST)
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
