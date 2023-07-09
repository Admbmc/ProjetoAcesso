import React from "react";
import { Button, Spinner } from "react-bootstrap";

import "./style.css";

export const Btn = ({ ...props }) => {
  return (
    <>
      <Button
        variant={props.variant}
        onClick={props.onClick}
        type="submit"
        className={
          props.loading ? props.className + " disabled" : props.className
        }
      >
        {props.loading ? (
          <React.Fragment>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            <span className="ml-3"> Carregando...</span>
          </React.Fragment>
        ) : (
          props.title
        )}
      </Button>
    </>
  );
};
