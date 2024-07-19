import React, { Component } from "react";
import Modal from "./components/Modal";
import axios from "axios";

class TodoApp extends Component {

  //creates the TodoApp class consisting of the list and active item
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      todoList: [],
      modal: false,
      activeItem: {
        task: "",
        description: "",
        completed: false,
      },
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  //calls the backend api to get the todos stored in the database
  refreshList = () => {
    axios
      .get("http://3.138.83.170:8000/api/todos/")
      .then((res) => this.setState({ todoList: res.data}))
      .catch((err) => console.log(err));
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  //determines whether the given todo is being created or edited and
  //makes the appropriate backend api call
  handleSubmit = (item) => {
    this.toggle();

    if (item.id) {
      axios
        .put(`http://3.138.83.170:8000/api/todos/${item.id}/`, item)
        .then((res) => this.refreshList());
      return;
    }
    axios
      .post("http://3.138.83.170:8000/api/todos/", item)
      .then((res) => this.refreshList());
  };

  //calls the backend api to delete the todo and refreshes the list display
  handleDelete = (item) => {
    axios
      .delete(`http://3.138.83.170:8000/api/todos/${item.id}/`)
      .then((res) => this.refreshList());
  };

  createItem = () => {
    const item = { task: "", description: "", completed: false};

    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  //displays complete or incomplete todos based on the current status
  displayCompleted = (status) => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }

    return this.setState({ viewCompleted: false });
  };

  //constructing the format of the todo-list
  renderTabList = () => {
    return (
      <div className="nav nav-tabs">
        <span
          className={this.state.viewCompleted ? "nav-link active" : "nav-link"}
          onClick={() => this.displayCompleted(true)}
        >
          Complete
        </span>
        <span
          className={this.state.viewCompleted ? "nav-link" : "nav-link active"}
          onClick={() => this.displayCompleted(false)}
        >
          Incomplete
        </span>
      </div>
    );
  };

  //renders the appropiate todos depending on which status is being displayed
  //along with appropraite buttons
  renderItems = () => {
    const { viewCompleted } = this.state;
    const items = this.state.todoList
    const newItems = items.filter(
        (item) => item.completed === viewCompleted
    );


    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${
            this.state.viewCompleted ? "completed-todo" : ""
          }`}
          title={item.description}
        >
          {item.task}
        </span>
        <span>
          <button
            className="btn btn-secondary mr-2"
            onClick={() => this.editItem(item) }
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => this.handleDelete(item) }
          >
            Delete
          </button>
        </span>
      </li>
    ));
  };

  //function to render the page and all of the needed components
  render() {
    return (
      <main className="container">
        <h1 className="text-black text-center my-4">To-do App</h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="mb-4">
                <button
                  className="btn btn-primary"
                  onClick={this.createItem}
                >
                  Add task
                </button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush border-top-0">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}

export default TodoApp;
