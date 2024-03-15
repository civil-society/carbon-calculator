import { html, css, LitElement } from "lit";
import { customElement, property, state, query } from "lit/decorators.js";
import { choose } from "lit/directives/choose.js";
import { sharedCSS } from "./carbon-calculator-css";
import { CartItem } from "./CartItem";
import { MdOutlinedTextField } from "@material/web/textfield/outlined-text-field";
import "@material/web/button/filled-button";
import "@material/web/checkbox/checkbox";
import "@material/web/icon/icon";
import "@material/web/list/list";
import "@material/web/list/list-item";
import "@material/web/textfield/outlined-text-field";
import "@material/web/tabs/tabs";
import "@material/web/tabs/primary-tab";
import { hasItems } from "./array-functions";

@customElement("carbon-calculator")
export class CarbonCalculator extends LitElement {
  static get styles() {
    return [
      sharedCSS,
      css`
        :host {
          display: block;
          width: 60ch;
        }

        md-tabs {
          min-width: 30ch;
        }

        md-primary-tab {
          max-width: 60px;
        }

        .empty {
          padding: 18px;
          font-family: "Roboto", sans-serif;
          font-size: 14px;
          font-weight: 400;
        }
      `,
    ];
  }

  /* ------------- html ------------- */

  render() {
    return html`<div class="l-column">
      <md-tabs>
        <md-primary-tab
          @click=${() => {
            this.tab = "air";
          }}
          ><md-icon slot="icon">travel</md-icon>Air</md-primary-tab
        >
        <md-primary-tab
          @click=${() => {
            this.tab = "car";
          }}
          ><md-icon slot="icon">directions_car</md-icon>Car</md-primary-tab
        >
        <md-primary-tab
          @click=${() => {
            this.tab = "home";
          }}
          ><md-icon slot="icon">home</md-icon>Home</md-primary-tab
        >
        <div class="l-spacer"></div>
        <md-primary-tab
          @click=${() => {
            this.tab = "cart";
          }}
          ><md-icon slot="icon">shopping_cart</md-icon>Cart</md-primary-tab
        >
      </md-tabs>

      <div>
        ${choose(this.tab, [
          ["air", () => this.renderAir()],
          ["car", () => this.renderCar()],
          ["home", () => this.renderHome()],
          ["cart", () => this.renderCart()],
        ])}
      </div>
    </div> `;
  }

  renderAir() {
    return html`<div class="l-column">
      <div>
        <md-outlined-text-field
          id="airTravelers"
          label="How many travelers?"
          value="1"
          type="number"
        ></md-outlined-text-field>
      </div>
      <div>
        <md-outlined-text-field
          id="airMiles"
          label="Trip mileage"
          placeholder="total miles"
          type="number"
          @input=${this.validateAir}
        ></md-outlined-text-field>
      </div>

      <!-- <div>or</div>

      <div>
        <md-outlined-text-field
          label="Starting location"
        ></md-outlined-text-field>
      </div>
      <div>
        <md-outlined-text-field label="End location"></md-outlined-text-field>
      </div>
      <div class="l-row">
        <label>
          <md-checkbox touch-target="wrapper" checked></md-checkbox>
          Round trip?
        </label>
      </div> -->
      <div>
        <md-filled-button ?disabled=${!this.airValid} @click=${this.clickAddAir}
          >Calculate Offset</md-filled-button
        >
      </div>
    </div>`;
  }

  renderCar() {
    return html`Car`;
  }

  renderHome() {
    return html`Home`;
  }

  renderCart() {
    return html`<div class="l-column">
      ${hasItems(this.cart)
        ? html`<md-list>
              ${this.cart.map(
                (item) => html`<md-list-item>
                  <div slot="headline">${item.title}</div>
                  <div slot="supporting-text">
                    ${item.carbon?.toFixed(2)}lbs carbon
                  </div>
                  <div slot="trailing-supporting-text">
                    $${item.cost?.toFixed(2)}
                  </div>
                  <md-icon slot="end" @click=${() => this.removeCartItem(item)}
                    >remove_circle</md-icon
                  >
                </md-list-item> `
              )}
            </md-list>
            <div>
              <md-filled-button
                href="https://stripe.com"
                target="_blank"
                ?disabled=${!hasItems(this.cart)}
                >Checkout</md-filled-button
              >
            </div>`
        : html`<div class="empty">No items in cart</div>`}
    </div>`;
  }

  /* ------------- properties ------------- */

  @query("#airTravelers")
  airTravelers?: MdOutlinedTextField;

  @query("#airMiles")
  airMiles?: MdOutlinedTextField;

  @state()
  dollarsPerAirMile: number = 0.01;

  @state()
  poundsPerAirMile: number = 0.56;

  @state()
  tab: "air" | "car" | "home" | "cart" = "air";

  @state()
  cart: Array<CartItem> = [];

  @state()
  airValid: boolean = false;

  /* ------------- javascript ------------- */

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
    if (!numTravelers) throw "No travelers";
    if (!numMiles) throw "No miles";

    let item = this.calculateAir(numTravelers, numMiles, false);
    this.cart.push(item);
    // clear the items

    this.tab = "cart";
    this.requestUpdate();
  }

  calculateAir(passengers: number, miles: number, roundtrip: boolean) {
    let item = new CartItem();
    item.title = "Plane trip";
    item.cost =
      passengers * miles * this.dollarsPerAirMile * (roundtrip ? 1 : 2);
    item.carbon =
      passengers * miles * this.poundsPerAirMile * (roundtrip ? 1 : 2);
    return item;
  }

  removeCartItem(item: CartItem) {
    var i = this.cart.indexOf(item);
    this.cart.splice(i, 1);
    this.requestUpdate();
  }
}
