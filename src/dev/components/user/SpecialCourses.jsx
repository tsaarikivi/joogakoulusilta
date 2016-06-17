import React from "react";
import { Link } from "react-router"
import firebase from "firebase";

export default class SpecialCourses extends React.Component {
  getItems() {
    var database = this.props.database
    var specialCoursesRef = database.ref('/specialCourses/');
    return specialCoursesRef;
  }

  render() {
    console.log(this.getItems())
    return (
      <div class="container">
        <h2>Tulevia erityiskursseja</h2>
        <div class="items-body">
          <span class="item-card">
            <h3>Joogakurssi 1</h3>
            <p>1.8 klo 12:00</p>
            <button class="btn-small">lisätietoja</button>
          </span>
          <span class="item-card">
            <h3>Joogakurssi 2</h3>
            <p>1.8 klo 12:00</p>
            <button class="btn-small">lisätietoja</button>
          </span>
          <span class="item-card">
            <h3>Joogakurssi 3</h3>
            <p>1.8 klo 12:00</p>
            <button class="btn-small">lisätietoja</button>
          </span>
        </div>
        <Link className="text-link" to="shop">Lisää erityiskursseja</Link>
      </div>
    );
  }
}
