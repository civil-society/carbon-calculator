import { html, css, LitElement } from "lit";
import { customElement, property, state, query } from "lit/decorators.js";
import { sharedCSS } from "./carbon-calculator-css";
import { MdOutlinedTextField } from "@material/web/textfield/outlined-text-field";
import { City } from "./city-list";
import "@material/web/button/filled-button";
import "@material/web/checkbox/checkbox";
import "@material/web/textfield/outlined-text-field";
import "./city-dialog";

@customElement("home-calculator")
export class HomeCalculator extends LitElement {
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
          id="propaneField"
          label="propane (gallons)"
          type="number"
          @input=${this.validate}
        ></md-outlined-text-field>
      </div>

      <div>
        <md-outlined-text-field
          id="electricityField"
          label="electricity (kWh)"
          type="number"
          @input=${this.validate}
        ></md-outlined-text-field>
      </div>

      <div>
        <md-outlined-text-field
          id="gasField"
          label="natural gas (therms)"
          type="number"
          @input=${this.validate}
        ></md-outlined-text-field>
      </div>

      <div>
        <md-outlined-text-field
          id="oilField"
          label="fuel oil (gallons)"
          type="number"
          @input=${this.validate}
        ></md-outlined-text-field>
      </div>

      <div>
        <md-filled-button ?disabled=${!this.valid} @click=${this.clickAdd}
          >Calculate Offset</md-filled-button
        >
      </div>
    </div>`;
  }

  /* ------------- properties ------------- */

  @query("#propaneField")
  propaneField?: MdOutlinedTextField;

  @query("#electricityField")
  electricityField?: MdOutlinedTextField;

  @query("#gasField")
  gasField?: MdOutlinedTextField;

  @query("#oilField")
  oilField?: MdOutlinedTextField;

  @state()
  valid: boolean = false;

  /* ------------- javascript ------------- */

  getCityString(city: City) {
    return city ? city?.name + " " + city?.admin1 + " " + city?.country : "";
  }

  validate() {
    this.valid =
      this.propaneField?.value != "" ||
      this.electricityField?.value != "" ||
      this.gasField?.value != "" ||
      this.oilField?.value != "";
    this.requestUpdate();
  }

  clickAdd() {
    const propane = Number(this.propaneField?.value) || 0;
    const electricity = Number(this.electricityField?.value) || 0;
    const gas = Number(this.gasField?.value) || 0;
    const oil = Number(this.oilField?.value) || 0;
    this.dispatchEvent(
      new CustomEvent("offset", {
        detail: {
          propane: propane,
          electricity: electricity,
          gas: gas,
          oil: oil,
        },
      })
    );
  }
}
