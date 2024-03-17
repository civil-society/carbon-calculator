import { html, css, LitElement } from "lit";
import { customElement, property, state, query } from "lit/decorators.js";
import { sharedCSS } from "./carbon-calculator-css";
import { CartItem } from "./CartItem";
import { MdOutlinedTextField } from "@material/web/textfield/outlined-text-field";
import { CityList, City } from "./city-list";
import { MdCheckbox } from "@material/web/checkbox/checkbox";
import "@material/web/button/filled-button";
import "@material/web/checkbox/checkbox";
import "@material/web/textfield/outlined-text-field";
import "./city-dialog";

@customElement("car-calculator")
export class CarCalculator extends LitElement {
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
      <div>
        <md-outlined-text-field
          id="milesField"
          label="Trip mileage"
          placeholder="total miles"
          type="number"
          value=${this.miles || ""}
          @input=${this.validateCar}
        ></md-outlined-text-field>
      </div>

      <div>OR, estimate the miles between cities</div>

      <div class="row">
        <md-outlined-text-field
          id="startCityField"
          label="Starting location"
          @click=${this.clickCityStart}
        >
        </md-outlined-text-field>
      </div>

      <div>
        <md-outlined-text-field
          id="endCityField"
          label="End location"
          @click=${this.clickCityEnd}
        ></md-outlined-text-field>
      </div>

      <div>
        <md-outlined-text-field
          id="mpgField"
          label="Car miles per gallon"
          value="25"
        ></md-outlined-text-field>
      </div>

      <div class="l-row">
        <md-checkbox id="roundTrip" touch-target="wrapper"></md-checkbox>
        <label>Round trip?</label>
      </div>
      <div>
        <md-filled-button ?disabled=${!this.valid} @click=${this.clickAddAir}
          >Calculate Offset</md-filled-button
        >
      </div>
    </div>`;
  }

  /* ------------- properties ------------- */

  @query("#milesField")
  milesField?: MdOutlinedTextField;

  @query("#startCityField")
  startCityField?: MdOutlinedTextField;

  @query("#endCityField")
  endCityField?: MdOutlinedTextField;

  @query("#roundTrip")
  roundTripCheckbox?: MdCheckbox;

  @query("#mgpField")
  mgpField?: MdOutlinedTextField;

  @state()
  miles?: number;

  @state()
  startCity?: City;

  @state()
  endCity?: City;

  @state()
  mpg?: number;

  @state()
  valid: boolean = false;

  /* ------------- javascript ------------- */

  async clickCityStart() {
    // this.clickAirCity("airStart");
    this.dispatchEvent(new CustomEvent("clickStartCity"));
  }
  async clickCityEnd() {
    this.dispatchEvent(new CustomEvent("clickEndCity"));
  }

  setStartCity(city: City) {
    this.startCity = city;
    this.startCityField!.value = this.getCityString(city);
    this.estimateMiles();
    this.validateCar();
  }

  setEndCity(city: City) {
    this.endCity = city;
    this.endCityField!.value = this.getCityString(city);
    this.estimateMiles();
    this.validateCar();
  }

  getCityString(city: City) {
    return city ? city?.name + " " + city?.admin1 + " " + city?.country : "";
  }

  async estimateMiles() {
    if (!this.startCity) return;
    if (!this.endCity) return;
    const dist =
      CityList.getDistanceBetweenCities(this.startCity, this.endCity) * 1.2;
    this.milesField!.value = dist.toString();

    // console.log("SF: 37.7749° N, 122.4194° W");
    // console.log("CHI: 41.8781° N, 87.6298° W");
    // console.log("1,841.72 mi");
    // console.log(this.airStartCity);
    // console.log(this.airEndCity);
    // console.log(dist);
  }

  validateCar() {
    const numMiles = Number(this.milesField?.value);
    this.valid = !(typeof numMiles === "undefined") && numMiles != 0;
    this.requestUpdate();
  }

  clickAddAir() {
    const numMiles = Number(this.milesField?.value);
    const mpg = Number(this.mgpField?.value) || 25;
    const isRoundTrip = this.roundTripCheckbox?.checked || false;
    if (!numMiles) throw "No miles";

    this.dispatchEvent(
      new CustomEvent("offset", {
        detail: { miles: numMiles, mpg: mpg, roundtrip: isRoundTrip },
      })
    );
  }
}
