// Implement here the fetching of client token from the server
import React from "react";
import Jquery from "jquery"

export default class ClientToken extends React.Component {

  constructor(){
    super();
  }

  getToken() {
    console.log("requesting client token");
    try {
        Jquery.get('http://localhost:3000', function(result){
          this.token = result;
          console.log(result);
        });
      } catch(error) {
        // Handle error
        console.log("xxxxxxx");
        console.error(error);
      }
    console.log(this.token);
    return this.token;
  }
}
