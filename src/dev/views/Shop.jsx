import React from "react";
import { Link } from "react-router"

export default class Shop extends React.Component {
  render() {
    return (
      <div>
        <div class="container">
          <Link className="text-link back-btn" to="user">&lt;Takaisin</Link>
          <h1>Kauppa</h1>
        </div>
        <div class="container shop-list-container">
          <ul class="shop-list">
            <li>
              <h3>Item 1</h3>
              <p>Desctiption. Lorem ipsum blabal bla balalsanb asldkksfj joutui armas</p>
              <p class="price">20 €</p>
              <button class="btn-small">Osta</button>
            </li>
            <li>
              <h3>Item 2</h3>
              <p>Desctiption. Lorem ipsum blabal bla balalsanb asldkksfj joutui armas</p>
              <p class="price">50 €</p>
              <button class="btn-small">Osta</button>
            </li>
            <li>
              <h3>Item 3</h3>
              <p>Desctiption. Lorem ipsum blabal bla balalsanb asldkksfj joutui armas</p>
              <p class="price">100 €</p>
              <button class="btn-small">Osta</button>
            </li>
            <li>
              <h3>Item 4</h3>
              <p>Desctiption. Lorem ipsum blabal bla balalsanb asldkksfj joutui armas</p>
              <p class="price">140 €</p>
              <button class="btn-small">Osta</button>
            </li>
            <li>
              <h3>Item 5</h3>
              <p>Desctiption. Lorem ipsum blabal bla balalsanb asldkksfj joutui armas</p>
              <p class="price">250 €</p>
              <button class="btn-small">Osta</button>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
