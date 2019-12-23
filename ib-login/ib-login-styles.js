import { css } from 'lit-element';

export default css`
:host {
  display: inline-block;
  box-sizing: border-box; }

:host([hidden]), [hidden] {
  display: none !important; }

*, *:before, *:after {
  box-sizing: inherit;
  font-family: inherit; }

#conteiner, .fields {
  margin-top: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column; }

#conteiner {
  margin-top: 15rem; }
`;
