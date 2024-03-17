import { html, css, LitElement } from "lit";
import { customElement, property, state, query } from "lit/decorators.js";
import { choose } from "lit/directives/choose.js";
import { sharedCSS } from "./carbon-calculator-css";
import { CartItem } from "./CartItem";
import { hasItems } from "./array-functions";
import { CityDialog } from "./city-dialog";
import { AirCalculator } from "./air-calculator";
import { CarCalculator } from "./car-calculator";

import "./city-dialog";
import "./air-calculator";
import "./car-calculator";
import "./home-calculator";
import "./quick-calculator";

import "@material/web/button/filled-button";
import "@material/web/icon/icon";
import "@material/web/textfield/outlined-text-field";
import "@material/web/tabs/tabs";
import "@material/web/tabs/primary-tab";

@customElement("carbon-calculator")
export class CarbonCalculator extends LitElement {
  static get styles() {
    return [
      sharedCSS,
      css`
        :host {
          display: block;
          max-width: 60ch;
          min-width: 140px;
        }

        md-primary-tab {
          max-width: 60px;
        }

        main {
          margin: 24px;
        }

        .empty {
          padding: 18px;
          font-family: "Roboto", sans-serif;
          font-size: 14px;
          font-weight: 400;
        }

        nav {
          display: none;
          border-bottom: 1px solid #ccc;
        }
        .nav-item {
          padding: 6px 12px;
          font-weight: 400;
        }
        .nav-item:hover {
          background-color: #ddd;
        }
        .nav-item[selected] {
          font-weight: 600;
        }

        @media only screen and (max-width: 330px) {
          md-tabs {
            display: none;
          }
          nav {
            display: block;
          }
        }
      `,
    ];
  }

  /* ------------- html ------------- */

  render() {
    return html`
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
        <md-primary-tab
          @click=${() => {
            this.tab = "quick";
          }}
          ><md-icon slot="icon">bolt</md-icon>Quick</md-primary-tab
        >
        <div class="l-spacer"></div>
        <md-primary-tab
          @click=${() => {
            this.tab = "cart";
          }}
          ><md-icon slot="icon">shopping_cart</md-icon>Cart</md-primary-tab
        >
      </md-tabs>

      <nav>
        ${this.renderNavItem("air", "Air")}
        <!-- -->
        ${this.renderNavItem("car", "Car")}
        <!-- -->
        ${this.renderNavItem("home", "Home")}
        <!-- -->
        ${this.renderNavItem("quick", "Quick")}
        <!-- -->
        ${this.renderNavItem("cart", "Cart")}
      </nav>

      <main>
        ${choose(this.tab, [
          ["air", () => this.renderAir()],
          ["car", () => this.renderCar()],
          ["home", () => this.renderHome()],
          ["quick", () => this.renderQuick()],
          ["cart", () => this.renderCart()],
        ])}
      </main>

      <city-dialog id="cityDialog"></city-dialog>
    `;
  }

  renderNavItem(
    atab: "air" | "car" | "home" | "quick" | "cart",
    title: string
  ) {
    return html`<div
      class="nav-item title-medium"
      ?selected=${this.tab == atab}
      @click=${() => {
        this.tab = atab;
      }}
    >
      ${title}
    </div>`;
  }

  renderAir() {
    return html`<air-calculator
      id="airCalculator"
      @clickStartCity=${this.clickAirStartCity}
      @clickEndCity=${this.clickAirEndCity}
      @offset=${this.addAirItem}
    ></air-calculator>`;
  }

  renderCar() {
    return html`<car-calculator
      id="carCalculator"
      @clickStartCity=${this.clickCarStartCity}
      @clickEndCity=${this.clickCarEndCity}
      @offset=${this.addCarItem}
    ></car-calculator>`;
  }

  renderHome() {
    return html`<home-calculator
      @offset=${this.addHomeItem}
    ></home-calculator>`;
  }

  renderQuick() {
    return html`<quick-calculator
      @offset=${this.addQuickItem}
    ></quick-calculator>`;
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

  @state()
  tab: "air" | "car" | "home" | "quick" | "cart" = "air";

  @query("#cityDialog")
  cityDialog?: CityDialog;

  @query("#airCalculator")
  airCalculator?: AirCalculator;

  @query("#carCalculator")
  carCalculator?: CarCalculator;

  @state()
  cart: Array<CartItem> = [];

  // calculations

  // @state()
  // dollarsPerAirMile: number = 0.004875;

  // tax
  @state()
  dollarsPerPound: number = 0.0125;

  // amount of carbon for mile of air travel
  @state()
  poundsPerAirMile: number = 0.56;

  // amount of carbon for car gasoline
  @state()
  poundsPerGallon: number = 39.28;

  // home

  @state()
  carbonPerPropane: number = 12.17;

  @state()
  carbonPerElectricity: number = 0.233;

  @state()
  carbonPerGas: number = 25.2;

  @state()
  carbonPerOil: number = 22.37;

  // quick

  @state()
  carbonPerCar: number = 722;

  @state()
  carbonPerAir: number = 425;

  @state()
  carbonPerHome: number = 1240;

  /* ------------- javascript ------------- */

  // AIR

  async clickAirStartCity() {
    const city = await this.cityDialog?.show();
    if (!city) return;
    this.airCalculator!.setStartCity(city);
  }

  async clickAirEndCity() {
    const city = await this.cityDialog?.show();
    if (!city) return;
    this.airCalculator!.setEndCity(city);
  }

  addAirItem(event: CustomEvent) {
    const travelers = event.detail.travelers;
    const miles = event.detail.miles;
    const roundtrip = event.detail.roundtrip;
    const item = this.calculateAir(travelers, miles, roundtrip);
    this.addCartItem(item);
  }

  calculateAir(
    passengers: number,
    miles: number,
    roundtrip: boolean
  ): CartItem {
    const carbon =
      passengers * miles * this.poundsPerAirMile * (roundtrip ? 2 : 1);
    let item = new CartItem();
    item.title = "Plane trip";
    item.carbon = carbon;
    item.cost = Math.max(carbon * this.dollarsPerPound, 0.01);
    return item;
  }

  // CAR

  async clickCarStartCity() {
    const city = await this.cityDialog?.show();
    if (!city) return;
    this.carCalculator!.setStartCity(city);
  }

  async clickCarEndCity() {
    const city = await this.cityDialog?.show();
    if (!city) return;
    this.carCalculator!.setEndCity(city);
  }

  addCarItem(event: CustomEvent) {
    const mpg = event.detail.mpg;
    const miles = event.detail.miles;
    const roundtrip = event.detail.roundtrip;
    const item = this.calculateCar(miles, mpg, roundtrip);
    this.addCartItem(item);
  }

  calculateCar(miles: number, mpg: number, roundtrip: boolean): CartItem {
    const carbon = (miles / mpg) * (roundtrip ? 2 : 1) * this.poundsPerGallon;
    let item = new CartItem();
    item.title = "Car trip";
    item.carbon = carbon;
    item.cost = Math.max(carbon * this.dollarsPerPound, 0.01);
    return item;
  }

  // HOME

  addHomeItem(event: CustomEvent) {
    const propane = event.detail.propane;
    const electricity = event.detail.electricity;
    const gas = event.detail.gas;
    const oil = event.detail.oil;
    const item = this.calculateHome(propane, electricity, gas, oil);
    this.addCartItem(item);
  }

  calculateHome(
    propane: number,
    electricity: number,
    gas: number,
    oil: number
  ): CartItem {
    const carbon =
      propane * this.carbonPerPropane +
      electricity * this.carbonPerElectricity +
      gas * this.carbonPerGas +
      oil * this.carbonPerOil;
    let item = new CartItem();
    item.title = "Home Energy Use";
    item.carbon = carbon;
    item.cost = Math.max(carbon * this.dollarsPerPound, 0.01);
    return item;
  }

  // QUICK

  addQuickItem(event: CustomEvent) {
    const type = event.detail.type;
    const time = event.detail.time;
    const item = this.calculateQuick(type, time);
    this.addCartItem(item);
  }

  calculateQuick(
    type: "home" | "air" | "car",
    time: "year" | "quarter" | "month"
  ): CartItem {
    let carbon = 0;
    let title = "";
    if (type == "car") {
      carbon = this.carbonPerCar;
      title = "Car Travel";
    } else if (type == "air") {
      carbon = this.carbonPerAir;
    } else if (type == "home") {
      carbon = this.carbonPerHome;
    }

    if (time == "month") {
      title = title + " 1 Month";
    } else if (time == "quarter") {
      carbon = carbon * 3;
      title = title + " 3 Months";
    } else if (time == "year") {
      carbon = carbon * 12;
      title = title + " 1 Year";
    }

    let item = new CartItem();
    item.title = title;
    item.carbon = carbon;
    item.cost = Math.max(carbon * this.dollarsPerPound, 0.01);
    return item;
  }

  // CART

  addCartItem(item: CartItem) {
    this.cart.push(item);
    this.tab = "cart";
    this.requestUpdate();
  }

  removeCartItem(item: CartItem) {
    var i = this.cart.indexOf(item);
    this.cart.splice(i, 1);
    this.requestUpdate();
  }
}
