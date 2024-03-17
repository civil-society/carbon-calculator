import { LitElement, html, css } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { MdDialog } from "@material/web/dialog/dialog";
import { sharedCSS } from "./carbon-calculator-css";
import { City, CityList } from "./city-list";
import { MdOutlinedTextField } from "@material/web/textfield/outlined-text-field";

import "@material/web/dialog/dialog";
import "@material/web/list/list";
import "@material/web/list/list-item";
import "@material/web/textfield/outlined-text-field";

@customElement("city-dialog")
export class CityDialog extends LitElement {
  //===== CSS ======
  static get styles() {
    return [
      sharedCSS,
      css`
        :host {
          display: block;
          width: 40ch;
        }

        #dialog {
          max-width: inherit;
          width: inherit;
          min-width: inherit;
          --md-dialog-container-color: white;
        }
      `,
    ];
  }

  //===== HTML ======
  render() {
    return html`
      <md-dialog id="dialog" @closed=${this._onClosed}>
        <div slot="headline">Select city</div>
        <div slot="content">
          <md-outlined-text-field
            id="cityField"
            label="City"
            @input=${this.inputCity}
          >
          </md-outlined-text-field>
          <md-list>
            ${this.citiesHint.map(
              (city) =>
                html`<md-list-item @click=${() => this.selectCity(city)}
                  ><div class="unselectable" slot="headline">
                    ${city.name} ${city.admin1} ${city.country}
                  </div></md-list-item
                >`
            )}
          </md-list>
        </div>
      </md-dialog>
    `;
  }

  //===== Properties ======

  @query("#dialog")
  dialog?: MdDialog;

  @query("#cityField")
  cityField?: MdOutlinedTextField;

  // @property({ type: Boolean })
  // open: boolean = false;
  @state()
  citiesHint: Array<any> = [];

  @state()
  cityList: CityList = new CityList();

  @state()
  private _resolve?: Function;

  @state()
  private _reject?: Function;

  //===== JS ======

  show(): Promise<City | undefined> {
    if (this.cityField) this.cityField.value = "";
    this.dialog?.show();
    this.dialog!.returnValue = "";

    return new Promise((resolve: Function, reject: Function) => {
      this._resolve = resolve;
      this._reject = reject;
    });
  }

  private _onClosed(event: Event) {
    if (this._resolve) {
      this._resolve(this.dialog?.returnValue);
    }
    this._close();
  }

  private _close() {
    this.dialog?.close();
    this._resolve = undefined;
    this._reject = undefined;
  }

  //

  inputCity(e: Event) {
    if (!this.cityField) return;
    const searchTerm = this.cityField?.value;
    if (!searchTerm) return;
    this.citiesHint = this.getCitiesHint(searchTerm);
  }

  getCitiesHint(searchTerm: string): Array<any> {
    return this.cityList.findCities(searchTerm);
  }

  selectCity(city: City) {
    if (!this._resolve) return;
    this._resolve(city);
    this._close();
  }
}
