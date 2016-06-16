import React from "react";
import { Link } from "react-router"

export default class User extends React.Component {
  render() {
    return (
      <div>
        <div class="container">
          <h1>Hei, Käyttäjä!</h1>
          <h2>Sinulla on <span class="use-times">8</span> joogakertaa käytettävissä</h2>
          <Link className="text-link" to="shop">Kauppaan</Link>
        </div>
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
        <div class="container timetable-container">
          <h2>Aikataulu</h2>
          <small>Klikkaa joogatuntia avataksesi lisätiedot ja varataksesi paikka tunnilta</small>
          <table>
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
          </table>
        </div>
      </div>
    );
  }
}
