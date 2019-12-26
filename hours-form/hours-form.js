import { html, LitElement } from 'lit-element';
import style from './hours-form-styles.js';
import '@vaadin/vaadin-text-field/vaadin-integer-field'
import '@vaadin/vaadin-combo-box/vaadin-combo-box'
import '@vaadin/vaadin-button/vaadin-button'
import { registerStyles, css } from '@vaadin/vaadin-themable-mixin/register-styles'; 

class HoursForm extends LitElement {
  static get properties() {
    return {
      years:Array,
      yearSelected:Number
    };
  }

  static get styles() {
    return style;
  }

  constructor() {
    super();
    this.years = [];
    this.yearSelected=null
  }
  firstUpdated(){
    this.fillYears();
  }

  fillYears(){
   let countYear=2005;
   this.years= Array.from({
      length:(new Date().getFullYear()-countYear)+1
    },
    ()=>countYear++
    ); 
    customElements.whenDefined('vaadin-combo-box').then(()=>{
      const comboBox= this.shadowRoot.querySelector('vaadin-combo-box');
      comboBox.items = this.years;
      comboBox.selectedItem = this.years[this.years.length-1];
      this.yearSelected = this.years[this.years.length-1];
     });

  }

  changeYear(event){
    this.yearSelected=event.target.value;
      this.dispatchEvent(new CustomEvent('change',{
        detail:{
          year:event.target.value
        }
      }))
    
  }
  
  send(){
    const [
        janInput,
        febInput,
        marInput,
        aprInput,
        mayInput,
        junInput,
        julInput,
        augInput,
        sepInput,
        octInput,
        novInput,
        decInput ] = this.shadowRoot.querySelectorAll('vaadin-integer-field');

    const properties = {
      year     :this.yearSelected,
      january  :janInput.value,
      february :febInput.value,
      march    :marInput.value,
      april    :aprInput.value,
      may      :mayInput.value,
      june     :junInput.value,
      july     :julInput.value,
      august   :augInput.value,
      september :sepInput.value,
      october  :octInput.value,
      november :novInput.value,
      december :decInput.value
    }

    this.dispatchEvent(new CustomEvent('sendhrs',{
      detail: properties
    }))
  }

  render() {
    return html`
        <div class="col ">
          <h2 class="center-item">Agregar horas</h2>
          <div class="row content-center">
            <div class="col">
              <div class="row">
                <label>Año: </label>
                <vaadin-combo-box @change="${this.changeYear}" theme="custom-border"></vaadin-combo-box>
              </div>
              <div class="row margin-top-sm">
                <label>Enero:</label>
                <vaadin-integer-field id="january" min="0" ></vaadin-integer-field>
              </div>
              <div class="row ">
                <label>Febrero:</label>
                <vaadin-integer-field id="february" min="0" ></vaadin-integer-field>
              </div>
              <div class="row ">
                <label>Marzo:</label>
                <vaadin-integer-field id="march" min="0" ></vaadin-integer-field>
              </div>
              <div class="row ">
                <label>Abril:</label>
                <vaadin-integer-field id="april" min="0" ></vaadin-integer-field>
              </div>
              <div class="row ">
                <label>Mayo:</label>
                <vaadin-integer-field id="may" min="0" ></vaadin-integer-field>
              </div>
              <div class="row">
                <label>Junio:</label>
                <vaadin-integer-field id="june" min="0" ></vaadin-integer-field>
              </div>
            </div>
            <div class="col">
              <div class="row margin-top-lg">
                <label>Julio:</label>
                <vaadin-integer-field id="july" min="0"></vaadin-integer-field>
              </div>
              <div class="row ">
                <label>Agosto:</label>
                <vaadin-integer-field id="august" min="0"></vaadin-integer-field>
              </div>
              <div class="row ">
                <label>Sep:</label>
                <vaadin-integer-field id="september" min="0"></vaadin-integer-field>
              </div>
              <div class="row ">
                <label>Oct:</label>
                <vaadin-integer-field id="october" min="0"></vaadin-integer-field>
              </div>
              <div class="row ">
                <label>Nov:</label>
                <vaadin-integer-field id="november" min="0"></vaadin-integer-field>
              </div>
              <div class="row ">
                <label>Dic:</label>
                <vaadin-integer-field id="december" min="0"></vaadin-integer-field>
              </div>
            </div>
          </div>
          <div class="row content-center margin-top-md">
            <vaadin-button @click="${this.send}" theme="primary">Guardar</vaadin-button>
          </div>          
        </div>
      `;
    }
}

registerStyles('vaadin-text-field', css`
  :host([theme~="custom-border"]) [part="input-field"] {
        width: 130px;
      }
`);




window.customElements.define("hours-form", HoursForm);
