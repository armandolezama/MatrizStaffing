import { html, LitElement } from 'lit-element';
import style from './hours-form-styles.js';
import '@vaadin/vaadin-text-field/vaadin-integer-field'
import '@vaadin/vaadin-combo-box/vaadin-combo-box'
import '@vaadin/vaadin-button/vaadin-button'
import { registerStyles, css } from '@vaadin/vaadin-themable-mixin/register-styles'; 

/**
 * `<hours-form>` is the component that contains
 * the format of the hours of the worked year
 * this component display a combo box with the year
 * and the months with their hours 
 */

class HoursForm extends LitElement {
  static get properties() {
    return {
      years:Array,
      yearSelected:Number,
      title:String,
      eventName:String
    };
  }

  static get styles() {
    return style;
  }

  constructor() {
    super();
    this.years = [];
    this.yearSelected=null;
    this.title = '';
    this.eventName = '';
  }

  fillYears(years){
    this.years = years;
  }

  edit(year){
    this.title = 'Editar los años';
    this.eventName = 'edited'
    this.validateForEdit(year);
  }

  create(year){
    this.title = 'Crear nuevo año';
    this.eventName = 'created'
    this.validateForCreate(year);
  }

  validateForCreate(year){
    if(this.years.indexOf(year) === -1){
      this.validateForEdit(year);
    } else {
      console.error('Year previously defined')
    }
  }
  validateForEdit(year){
    const textFields= this.shadowRoot.querySelectorAll('.month');
    if(year>=new Date().getFullYear()){
      this.shadowRoot.querySelector('vaadin-button').disabled=false;
      for(const itr of textFields){
        itr.disabled=false;
      }
    }else{
      this.shadowRoot.querySelector('vaadin-button').disabled=true;
      for(const itr of textFields){
        itr.disabled=true;
      }
    }
  }

  changeYear(event){
    this.yearSelected=event.target.value;
    this.validateForEdit(this.yearSelected)
    const integerField = this.shadowRoot.querySelectorAll('.month')
    for(const month of integerField){
      month.value = '';
    }
      this.dispatchEvent(new CustomEvent('years-changed',{
        detail:{
          year:event.target.value 
        }
      }))
    
  }
  set(year){
    const integerField = this.shadowRoot.querySelectorAll('.month')
    for(const month of integerField){
      month.value = year[month.id]
    }
    const comboBox = this.shadowRoot.querySelector('#year')
    comboBox.selectedItem=this.yearSelected;

  }
  
  send(){
    console.log('estoy salvando')
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
        decInput ] = this.shadowRoot.querySelectorAll('.month');

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

    this.dispatchEvent(new CustomEvent(this.eventName,{
      detail: properties
    }))
  }

  render() {
    return html`
        <div class="col ">
          <h2 class="center-item">${this.title}</h2>
          <div class="row content-center">
            <div class="col">
              <div class="row">
                <label>Año: </label>
                <vaadin-integer-field @change="${this.changeYear}" theme="custom-border" id="year" min="2000"></vaadin-integer-field>
              </div>
              <div class="row margin-top-sm">
                <label>Enero:</label>
                <vaadin-integer-field id="january" min="0" class="month" ></vaadin-integer-field>
              </div>
              <div class="row ">
                <label>Febrero:</label>
                <vaadin-integer-field id="february" min="0" class="month"></vaadin-integer-field>
              </div>
              <div class="row ">
                <label>Marzo:</label>
                <vaadin-integer-field id="march" min="0" class="month"></vaadin-integer-field>
              </div>
              <div class="row ">
                <label>Abril:</label>
                <vaadin-integer-field id="april" min="0" class="month"></vaadin-integer-field>
              </div>
              <div class="row ">
                <label>Mayo:</label>
                <vaadin-integer-field id="may" min="0" class="month"></vaadin-integer-field>
              </div>
              <div class="row">
                <label>Junio:</label>
                <vaadin-integer-field id="june" min="0" class="month"></vaadin-integer-field>
              </div>
            </div>
            <div class="col">
              <div class="row margin-top-lg">
                <label>Julio:</label>
                <vaadin-integer-field id="july" min="0" class="month"></vaadin-integer-field>
              </div>
              <div class="row ">
                <label>Agosto:</label>
                <vaadin-integer-field id="august" min="0" class="month"></vaadin-integer-field>
              </div>
              <div class="row ">
                <label>Sep:</label>
                <vaadin-integer-field id="september" min="0" class="month"></vaadin-integer-field>
              </div>
              <div class="row ">
                <label>Oct:</label>
                <vaadin-integer-field id="october" min="0" class="month"></vaadin-integer-field>
              </div>
              <div class="row ">
                <label>Nov:</label>
                <vaadin-integer-field id="november" min="0" class="month"></vaadin-integer-field>
              </div>
              <div class="row ">
                <label>Dic:</label>
                <vaadin-integer-field id="december" min="0" class="month"></vaadin-integer-field>
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
