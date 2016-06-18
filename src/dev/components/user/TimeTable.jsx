import React from "react";
import { Link } from "react-router"

export default class TimeTable extends React.Component {
  render() {
    return (
      <div class="container timetable-container">
        <h2>Aikataulu</h2>
        <small>Klikkaa joogatuntia avataksesi lisätiedot ja varataksesi paikka tunnilta</small>
        <table>
          <tbody>
            <tr>
              <th>Maanantai</th>
              <td><h3>Jooga</h3><p>12:00-13:00</p></td>
              <td><h3>Jooga</h3><p>13:00-14:00</p></td>
              <td><h3>Jooga</h3><p>14:00-15:00</p></td>
            </tr>
            <tr>
              <th>Tiistai</th>
              <td><h3>Jooga</h3><p>12:00-13:00</p></td>
              <td><h3>Jooga</h3><p>13:00-14:00</p></td>
              <td><h3>Jooga</h3><p>14:00-15:00</p></td>
              <td><h3>Jooga</h3><p>15:00-16:00</p></td>
            </tr>
            <tr>
              <th>Keskiviikko</th>
              <td><h3>Jooga</h3><p>12:00-13:00</p></td>
              <td><h3>Jooga</h3><p>13:00-14:00</p></td>
              <td><h3>Jooga</h3><p>14:00-15:00</p></td>
            </tr>
            <tr>
              <th>Torstai</th>
              <td><h3>Jooga</h3><p>12:00-13:00</p></td>
              <td><h3>Jooga</h3><p>13:00-14:00</p></td>
              <td><h3>Jooga</h3><p>14:00-15:00</p></td>
              <td><h3>Jooga</h3><p>15:00-16:00</p></td>
              <td><h3>Jooga</h3><p>16:00-17:00</p></td>
            </tr>
            <tr>
              <th>Perjantai</th>
              <td><h3>Jooga</h3><p>12:00-13:00</p></td>
              <td><h3>Jooga</h3><p>13:00-14:00</p></td>
              <td><h3>Jooga</h3><p>14:00-15:00</p></td>
            </tr>
            <tr>
              <th>Lauantai</th>
              <td><h3>Jooga</h3><p>12:00-13:00</p></td>
              <td><h3>Jooga</h3><p>13:00-14:00</p></td>
              <td><h3>Jooga</h3><p>14:00-15:00</p></td>
            </tr>
            <tr>
              <th>Sunnuntai</th>
              <td><h3>Jooga</h3><p>12:00-13:00</p></td>
              <td><h3>Jooga</h3><p>13:00-14:00</p></td>
              <td><h3>Jooga</h3><p>14:00-15:00</p></td>
              <td><h3>Jooga</h3><p>15:00-16:00</p></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
