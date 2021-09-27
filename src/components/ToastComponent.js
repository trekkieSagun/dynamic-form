import React from "react";
import { ToastContainer, Toast } from "react-bootstrap";

function ToastComponent(props) {
  return (
    <div>
      <div>
        <ToastContainer position="top-end" className="p-3">
          <Toast
            show={props.showToast}
            onClose={props.toggleToast}
            delay={3000}
            autohide
          >
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">Admin</strong>
              <small className="text-muted">just now</small>
            </Toast.Header>
            <Toast.Body>New item added successfully</Toast.Body>
          </Toast>
        </ToastContainer>
      </div>
    </div>
  );
}

export default ToastComponent;
