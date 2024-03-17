import { html, css, LitElement } from "lit";
import {
  customElement,
  property,
  state,
  query,
  queryAll,
} from "lit/decorators.js";
import { sharedCSS } from "./carbon-calculator-css";

import "@material/web/button/filled-button";
import "@material/web/radio/radio";
import { MdRadio } from "@material/web/radio/radio";

@customElement("quick-calculator")
export class QuickCalculator extends LitElement {
  static get styles() {
    return [
      sharedCSS,
      css`
        :host {
          display: block;
        }
      `,
    ];
  }

  /* ------------- html ------------- */

  render() {
    return html`<div class="l-column">
      <div class="l-column" role="radiogroup" aria-labelledby="group-title">
        <h3 id="group-title">What to offset?</h3>
        <div class="l-column">
          <div class="l-row">
            <md-radio
              id="car-radio"
              name="group"
              value="car"
              aria-label="Car travel"
              checked
            ></md-radio>
            <label for="car-radio">Car travel</label>
          </div>
          <div class="l-row">
            <md-radio
              id="home-radio"
              name="group"
              value="home"
              aria-label="Home energy"
            ></md-radio>
            <label for="home-radio">Home energy</label>
          </div>
          <div class="l-row">
            <md-radio
              id="air-radio"
              name="group"
              value="air"
              aria-label="Air travel"
            ></md-radio>
            <label for="air-radio">Air travel</label>
          </div>
        </div>
      </div>

      <div class="l-column" role="radiogroup" aria-labelledby="time-title">
        <h3 id="time-title">For what period?</h3>
        <div class="l-column">
          <div class="l-row">
            <md-radio
              id="year-radio"
              name="time"
              value="year"
              aria-label="year"
              checked
            ></md-radio>
            <label for="year-radio">year</label>
          </div>
          <div class="l-row">
            <md-radio
              id="quarter-radio"
              name="time"
              value="quarter"
              aria-label="quarter"
            ></md-radio>
            <label for="quarter-radio">quarter</label>
          </div>
          <div class="l-row">
            <md-radio
              id="month-radio"
              name="time"
              value="month"
              aria-label="month"
            ></md-radio>
            <label for="month-radio">month</label>
          </div>
        </div>
      </div>
      <div>
        <md-filled-button @click=${this.clickAdd}
          >Calculate Offset</md-filled-button
        >
      </div>
    </div>`;
  }

  /* ------------- properties ------------- */

  @query("#home-radio")
  homeRadio?: MdRadio;

  @query("#air-radio")
  airRadio?: MdRadio;

  @query("#car-radio")
  carRadio?: MdRadio;

  @query("#year-radio")
  yearRadio?: MdRadio;

  @query("#quarter-radio")
  quarterRadio?: MdRadio;

  @query("#month-radio")
  monthRadio?: MdRadio;

  /* ------------- javascript ------------- */

  clickAdd() {
    let type;
    let time;

    if (this.homeRadio?.checked) {
      type = "home";
    } else if (this.airRadio?.checked) {
      type = "air";
    } else if (this.carRadio?.checked) {
      type = "car";
    }

    if (this.yearRadio?.checked) {
      time = "year";
    } else if (this.quarterRadio?.checked) {
      time = "quarter";
    } else if (this.monthRadio?.checked) {
      time = "month";
    }

    this.dispatchEvent(
      new CustomEvent("offset", {
        detail: { type: type, time: time },
      })
    );
  }
}
