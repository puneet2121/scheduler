import React from "react";
import classNames from "classnames";

import "components/Button.scss";
import { portalSuspended } from "pg-protocol/dist/messages";

export default function Button(props) {
   let buttonClass = classNames({
      'button':true,
      'button--confirm':props.confirm,
      'button--danger':props.danger
  
});
   return (
      <button disabled={props.disabled} 
      onClick={props.onClick} 
      className={buttonClass}>{props.children}</button>
   )
}
