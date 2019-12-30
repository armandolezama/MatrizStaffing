import { html, LitElement } from 'lit-element';
import style from './ib-modal-component-styles.js';
import '@vaadin/vaadin-dialog/vaadin-dialog.js';
import '@catsys/hours-form/hours-form.js';

class IbModalComponent extends LitElement {
  static get styles() {
    return style;
  }
    render() {
    return html`
            <vaadin-dialog >
              <template>
                <hours-form> </hours-form>
              </template>
            </vaadin-dialog>
      `;
    }

    openModal(){
      console.log(this.style)
      const dialog = this.shadowRoot.querySelector('vaadin-dialog');
      dialog.opened = true;

      dialog.addEventListener('edited', event => {
        this.dispatchEvent(new CustomEvent('edited', {
          detail: event.detail
        }))    
    })
      dialog.addEventListener('created', event => {
        this.dispatchEvent(new CustomEvent('created', {
          detail: event.detail
        }))  
    })
 
    }
}

window.customElements.define("ib-modal-component", IbModalComponent);
