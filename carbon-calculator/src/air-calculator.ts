import { html, css, LitElement } from "lit";
import { customElement, property, state, query } from "lit/decorators.js";
import { sharedCSS } from "./carbon-calculator-css";
import { MdOutlinedTextField } from "@material/web/textfield/outlined-text-field";
import { CityList, City } from "./city-list";
import { MdCheckbox } from "@material/web/checkbox/checkbox";
import "@material/web/button/filled-button";
import "@material/web/checkbox/checkbox";
import "@material/web/textfield/outlined-text-field";
import "./city-dialog";

@customElement("air-calculator")
export class AirCalculator extends LitElement {
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
          id="airTravelers"
          label="How many travelers?"
          value=${this.airNumTravelers}
          type="number"
        ></md-outlined-text-field>
      </div>
      <div>
        <md-outlined-text-field
          id="airMiles"
          label="Trip mileage"
          placeholder="total miles"
          type="number"
          value=${this.airNumMiles || ""}
          @input=${this.validateAir}
        ></md-outlined-text-field>
      </div>

      <div>OR, estimate the miles between cities</div>

      <div class="row">
        <md-outlined-text-field
          id="airStart"
          label="Starting location"
          @click=${this.clickAirCityStart}
        >
        </md-outlined-text-field>
      </div>

      <div>
        <md-outlined-text-field
          id="airEnd"
          label="End location"
          @click=${this.clickAirCityEnd}
        ></md-outlined-text-field>
      </div>
      <div class="l-row">
        <md-checkbox id="roundTrip" touch-target="wrapper"></md-checkbox>
        <label>Round trip?</label>
      </div>
      <div>
        <md-filled-button ?disabled=${!this.airValid} @click=${this.clickAddAir}
          >Calculate Offset</md-filled-button
        >
      </div>
    </div>`;
  }

  /* ------------- properties ------------- */

  @query("#airTravelers")
  airTravelers?: MdOutlinedTextField;

  @query("#airMiles")
  airMiles?: MdOutlinedTextField;

  @query("#airStart")
  airStart?: MdOutlinedTextField;

  @query("#airEnd")
  airEnd?: MdOutlinedTextField;

  @query("#roundTrip")
  roundTripCheckbox?: MdCheckbox;

  @state()
  airNumTravelers: number = 1;

  @state()
  airNumMiles?: number;

  @state()
  airStartCity?: City;

  @state()
  airEndCity?: City;

  @state()
  airValid: boolean = false;

  /* ------------- javascript ------------- */

  async clickAirCityStart() {
    // this.clickAirCity("airStart");
    this.dispatchEvent(new CustomEvent("clickStartCity"));
  }
  async clickAirCityEnd() {
    this.dispatchEvent(new CustomEvent("clickEndCity"));
  }

  setStartCity(city: City) {
    this.airStartCity = city;
    this.airStart!.value = this.getCityString(city);
  }

  setEndCity(city: City) {
    this.airEndCity = city;
    this.airEnd!.value = this.getCityString(city);
  }

  getCityString(city: City) {
    return city ? city?.name + " " + city?.admin1 + " " + city?.country : "";
  }

  async estimateMiles() {
    if (!this.airStartCity) return;
    if (!this.airEndCity) return;
    const dist = CityList.getDistanceBetweenCities(
      this.airStartCity,
      this.airEndCity
    );
    this.airMiles!.value = dist.toString();
    this.validateAir();
    // console.log("SF: 37.7749° N, 122.4194° W");
    // console.log("CHI: 41.8781° N, 87.6298° W");
    // console.log("1,841.72 mi");
    // console.log(this.airStartCity);
    // console.log(this.airEndCity);
    // console.log(dist);
  }

  validateAir() {
    const numTravelers = Number(this.airTravelers?.value);
    const numMiles = Number(this.airMiles?.value);
    this.airValid =
      !(typeof numTravelers === "undefined") &&
      !(typeof numMiles === "undefined") &&
      numTravelers != 0 &&
      numMiles != 0;
    this.requestUpdate();
  }

  clickAddAir() {
    // get the data
    const numTravelers = Number(this.airTravelers?.value);
    const numMiles = Number(this.airMiles?.value);
    const isRoundTrip = this.roundTripCheckbox?.checked || false;
    if (!numTravelers) throw "No travelers";
    if (!numMiles) throw "No miles";

    this.dispatchEvent(
      new CustomEvent("offset", {
        detail: {
          travelers: numTravelers,
          miles: numMiles,
          roundtrip: isRoundTrip,
        },
      })
    );

    // let item = this.calculateAir(numTravelers, numMiles, isRoundTrip);
    // this.dispatchEvent(new CustomEvent("offset", { detail: { item: item } }));
  }
}
