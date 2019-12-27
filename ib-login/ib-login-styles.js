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
  margin-left: 280px;
  margin-right: 280px;
  margin-top: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column; }

#conteiner {
  margin-top: 15rem; }

#noteuser, #notepassword {
  font-size: 11px;
  display: none;
  color: #00ACEA; }

/* The Modal (background) */
.modal {
  display: none;
  /* Hidden by default */
  position: fixed;
  /* Stay in place */
  z-index: 1;
  /* Sit on top */
  left: 0;
  top: 0;
  width: 100%;
  /* Full width */
  height: 100%;
  /* Full height */
  overflow: auto;
  /* Enable scroll if needed */
  background-color: black;
  /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4);
  /* Black w/ opacity */ }

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  /* Could be more or less, depending on screen size */ }

/* The Close Button */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold; }

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer; }
`;
