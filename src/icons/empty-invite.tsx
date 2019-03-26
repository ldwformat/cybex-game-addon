import * as React from "react";
import SvgIcon from "@material-ui/core/SvgIcon";

export const EmptyInvite = props => (
  <SvgIcon
    viewBox="0 0 80 80"
    style={{ width: "80px", height: "80px" }}
    {...props}
  >
    <g fill="none" fillRule="evenodd">
      <path fillRule="nonzero" d="M0 0h80v80H0z" />
      <path
        fill="#DDD"
        fillRule="nonzero"
        d="M17.57 11.495v57.01h43.86V32.788H49.595c-5.383 0-9.747-4.305-9.747-9.616V11.495H17.57zM16.177 6h29.24v17.172c0 2.276 1.87 4.12 4.178 4.12H67V69.88C67 72.155 65.13 74 62.823 74H16.177C13.87 74 12 72.155 12 69.879V10.12C12 7.845 13.87 6 16.177 6z"
      />
      <path
        fill="#DDD"
        fillRule="nonzero"
        d="M17.57 11.495v57.01h43.86V29.57L43.11 11.495H17.57zM16.177 6h29.24L67 27.293v42.586C67 72.155 65.13 74 62.823 74H16.177C13.87 74 12 72.155 12 69.879V10.12C12 7.845 13.87 6 16.177 6z"
      />
      <path
        fill="#979797"
        fillRule="nonzero"
        d="M24 41h4a2 2 0 1 0 4 0h4a6 6 0 1 1-12 0zM43 41h4a2 2 0 1 0 4 0h4a6 6 0 1 1-12 0z"
      />
      <circle cx="40" cy="55" r="2" fill="#979797" fillRule="nonzero" />
      <path
        fill="#979797"
        d="M57.568 3h9.216v1.999l-5.91 5.852H67V13H57v-2.074l5.845-5.79h-5.277zM67.34 16h5.53v1.399l-3.545 4.097H73V23h-6v-1.452l3.507-4.053H67.34z"
      />
    </g>
  </SvgIcon>
);
