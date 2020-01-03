import { html, LitElement } from 'lit-element';
import style from './hours-table-styles.js';
import '@fluidnext-polymer/paper-grid/paper-grid.js';
import '@polymer/paper-button/paper-button.js';
import '@ironbit/hours-form/hours-form.js';

class HoursTable extends LitElement {
  static get properties() {
    return {
      url: {type: String},
      years : {type: Array},
      newYear: {type: Object},
      rawData: {type: Object},
      hours: {type: Object}
    };
  }

  static get styles() {
    return style;
  }

  constructor() {
    super();
    this.url = ''
    this.years = [];
    this.hours = {};
    this.rawData = {};
    this.newYear = '';
  }

  setRawData(rawData){
    this.rawData = rawData;
    this.years = [];
    this.hours = {};
    for(const year in rawData){
      this.years = [...this.years, {year: year}];
    }
  }

  __getHours(year){
    this.hours = this.rawData[year];
  }

  __buildIcon(data){
    const icon = document.createElement('img');
    icon.src = this.url;
    icon.alt = this.url;
    icon.id = data;
    icon.addEventListener('click', event => {
      const form = this.shadowRoot.querySelector('hours-form');
      form.display();
      form.edit();
      this.__getHours(event.currentTarget.id);
      form.set(event.currentTarget.id, this.hours);
    })

    return icon
  }

  addNewYear(newYear){
    this.years = [...this.years, {year: newYear}];
  }
  
  firstUpdated(){
    const registerButton = this.shadowRoot.querySelector('paper-button');
    registerButton.addEventListener('click', () => {
      this.shadowRoot.querySelector('hours-form').display();
      this.shadowRoot.querySelector('hours-form').create();
      this.shadowRoot.querySelector('hours-form').clearMonths();
    });
    const form = this.shadowRoot.querySelector('hours-form');
    customElements.whenDefined(form.localName).then(() => {
        form.addEventListener('years-changed', event => {
          this.__getHours(event.detail.year);
          form.set(event.detail.year,  this.hours);
        })
        form.addEventListener('edited', event => {
          this.dispatchEvent(new CustomEvent('edited', {detail: event.detail}))
        })
        form.addEventListener('created', event => {
          this.dispatchEvent(new CustomEvent('created', {detail: event.detail}))
        })
    })
  }

  getYearCollection(){
    return this.years;
  }

  render() {
    return html`
        <div class="col content-center">
          <table>
            <thead>
              <th>Año</th>
              <th>Acciones</th>
            </thead>
            <tbody>
              ${ this.years.map( (year, index) => { 
                return html`<tr>
                              <td>${ year.year }</td>
                              <td>
                                ${this.__buildIcon(year.year)}
                              </td>
                            </tr>`;
              }) }
            </tbody>
          </table>
          <paper-button class="margin-top-md" >Registrar</paper-button>
        </div>
        <hours-form></hours-form>
      `;
    }
}


window.customElements.define("hours-table", HoursTable);
