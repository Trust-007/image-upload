/* eslint-disable */
import ReactDom from "react-dom";
import classes from "./Modal.module.css";

const BackDrop = (props) => (
  <div className={classes.backdrop} onClick={props.onHide} />
);

const OverLay = (props) => (
  <div className={classes.modal}>{props.children}</div>
);
const overlays = document.getElementById("overlays");
const Modal = (props) => (
  <>
    {ReactDom.createPortal(<BackDrop onHide={props.onHide} />, overlays)}
    {ReactDom.createPortal(<OverLay>{props.children}</OverLay>, overlays)}
  </>
);

export default Modal;
