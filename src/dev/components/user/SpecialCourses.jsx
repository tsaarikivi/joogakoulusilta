import React from "react";
import { Link } from "react-router"

export default class SpecialCourses extends React.Component {
  constructor() {
    super();
    this.state = {courses: [{title: "moi"}]}
  }

  componentWillMount() {
    var database = this.props.database
    var that = this;
    var specialCoursesRef = database.ref('/specialCourses');
    specialCoursesRef.once("value", function(snapshot){
      var courses = [];
      snapshot.forEach(function(data){
        var course = {
          title: data.val().title,
          time: data.val().time,
          description: data.val().description
        }
        courses.push(course);
      })
      that.setState({courses: courses});
    });
  }

  componentWillUnmount() {
    this.firebaseRef.off();
  }

  render() {
    return (
      <div class="container">
        <h2>Tulevia erityiskursseja</h2>
        <div class="items-body">
          <span class="item-card">
            <h3>{this.state.courses[0].title}</h3>
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
