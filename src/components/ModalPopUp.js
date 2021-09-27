import { Modal, Button } from "react-bootstrap";

export function ModalPopUp(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Item Modal
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={props.handleSubmit} className="form-group">
          {props.changeData?.map((item, index) => (
            <div className="input-field" key={index}>
              <label>Name</label>
              <input
                className="form-control"
                required
                type="text"
                name="name"
                value={item.name || ""}
                onChange={(e) => props.handleChange(index, e)}
              />
              <button
                className="btn-add-remove"
                type="button"
                onClick={props.addInput}
              >
                <i class="far fa-plus-circle"></i>
              </button>

              {index ? (
                <button
                  type="button"
                  className="btn-add-remove"
                  onClick={() => props.removeInput(index)}
                >
                  <i class="far fa-minus-circle"></i>
                </button>
              ) : null}
            </div>
          ))}

          <div className="button-section">
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
