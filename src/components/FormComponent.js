import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";

import "./FormComponent.css";
import { ModalPopUp } from "./ModalPopUp";
import NavbarComponent from "./Navbar";
import ToastComponent from "./ToastComponent";

class FormComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      clickedSubmit: false,
      showModal: false,
      changeData: [{ name: "" }],
      editingIndex: null,
      toggleEdit: false,
      edittingData: [{ name: null }],
      showToast: false,
    };
  }

  toggleToast = () => {
    this.setState({
      showToast: false,
    });
  };

  toggleAdd = () => {
    this.setState({
      showModal: true,
    });
  };

  addInput = () => {
    console.log(this.state.changeData);
    this.setState({
      changeData: [...this.state.changeData, { name: "" }],
    });
  };

  removeInput = (i) => {
    let changeData = this.state.changeData;
    changeData.splice(i, 1);
    this.setState({ changeData });
  };

  handleChange = (i, e) => {
    let changeData = [...this.state.changeData];
    changeData[i][e.target.name] = e.target.value;
    this.setState({ changeData });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = [...this.state.changeData];
    this.setState({
      clickedSubmit: true,
      showModal: false,
      data: [...this.state.data, ...updatedData],
      changeData: [{ name: "" }],
      showToast: true,
    });
  };

  handleDelete = (id) => {
    const confirmed = window.confirm("Do you want to delete this?");

    if (confirmed) {
      const newData = this.state.data.filter((item, index) => index !== id);
      this.setState({ data: newData });
    }
  };
  handleEdit = (id) => {
    this.setState({
      toggleEdit: true,
      editingIndex: id,
      edittingData: {
        name: this.state.data[id].name,
      },
    });
  };

  handleEditingData = (e) => {
    const { name, value } = e.target;
    const edittingData = { ...this.state.edittingData };
    edittingData[name] = value;
    this.setState({ edittingData });
  };

  submitEdit = (e, index) => {
    e.preventDefault();
    const newData = [...this.state.data];

    newData[index] = {
      name: this.state.edittingData.name,
    };

    this.setState({
      data: newData,
      toggleEdit: false,
      edittingData: {
        name: null,
      },
    });
  };

  handleCancel = () => {
    this.setState({
      toggleEdit: false,
    });
  };

  modalOff = () => {
    this.setState({
      showModal: false,
    });
  };

  render() {
    return (
      <>
        <NavbarComponent />
        <div className="container m-5">
          <div className="add-item-btn">
            <Button variant="primary" onClick={this.toggleAdd}>
              Add Item
            </Button>
          </div>

          <ToastComponent
            showToast={this.state.showToast}
            toggleToast={this.toggleToast}
          />

          <ModalPopUp
            show={this.state.showModal}
            onHide={this.modalOff}
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            handleCancel={this.handleCancel}
            addInput={this.addInput}
            removeInput={this.removeInput}
            changeData={this.state.changeData}
          />

          {this.state.clickedSubmit && (
            <div className="item-lists">
              <h3>Item Lists</h3>
              <div className="table-list">
                <Table>
                  <thead>
                    <tr>
                      <th>S.N</th>
                      <th>Name</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  {this.state.data?.map((item, index) => (
                    <tbody>
                      <tr>
                        <td>{index + 1}</td>{" "}
                        {this.state.toggleEdit &&
                        this.state.editingIndex === index ? (
                          <td>
                            <input
                              className="form-control"
                              type="text"
                              name="name"
                              value={this.state.edittingData.name}
                              onChange={(e) => this.handleEditingData(e)}
                            />
                          </td>
                        ) : (
                          <td>{item.name}</td>
                        )}
                        {this.state.toggleEdit &&
                        this.state.editingIndex === index ? (
                          <td>
                            <button onClick={(e) => this.submitEdit(e, index)}>
                              <i
                                style={{ color: "green" }}
                                class="far fa-check-circle"
                              ></i>
                            </button>
                            <button
                              className="delete-btn"
                              onClick={() => this.handleCancel()}
                            >
                              <i class="far fa-times-circle"></i>
                            </button>
                          </td>
                        ) : (
                          <td>
                            <button onClick={() => this.handleEdit(index)}>
                              <i class="far fa-edit"></i>
                            </button>
                            <button
                              className="delete-btn"
                              onClick={() => this.handleDelete(index)}
                            >
                              <i class="far fa-trash"></i>
                            </button>
                          </td>
                        )}
                      </tr>
                    </tbody>
                  ))}
                </Table>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
}

export default FormComponent;
