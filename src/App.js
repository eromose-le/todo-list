import React, { Component } from 'react';
import './App.scss';
import TodoList from './components/TodoList';
import TodoInput from './components/TodoInput';

import "bootstrap/dist/css/bootstrap.min.css";
import uuid from 'uuid';

class App extends Component {
  // initialization
  state = {
    items: [],
    id: uuid(),
    item: "",
    editItem: false
  };

  // listen for item & preserve the value in the state "empty"
  handleChange = e => {
    this.setState({
      item: e.target.value
    });
  };

  handleSubmit = e => {
    // prevent reloading after submit
    e.preventDefault();

  // can't alter the state with push()
    const newItem = {
      id: this.state.id,
      title: this.state.item
  };

  // Used splitItem() instead to form newArray[]
  const updatedItems = [...this.state.items, newItem];

    this.setState({
      // Update the Array
      items: updatedItems,
      // return placeHolder to ""
      item: "",
      // unique ID()
      id: uuid(),
      editItem: false
    });
  };

  clearList = () => {
    this.setState({
      items: []
    });
  };

  // display items date do not match this Id
  handleDelete = id => {
    const filteredItems = this.state.items.filter(item => item.id !== id);
    this.setState({
      // set the newFiltered array
      items: filteredItems
    });
  };

  handleEdit = id => {
    //Grab items not on the list
    const filteredItems = this.state.items.filter(item => item.id !== id);
    const selectedItem = this.state.items.find(item => item.id === id);
    this.setState({
      items: filteredItems,
      item: selectedItem.title,
      editItem: true,
      //inherited the initial state Value
      id: id
    });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          {/* mx align center, mt margin-top  */}
          <div className="col-10 mx-auto col-md-8 mt-4">
          <h3 className="text-capitalize text-center">todo input</h3>
          <TodoInput
            // passing props and Method
            item={this.state.item}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            editItem={this.state.editItem}
          />
          <TodoList 
            items={this.state.items}
            // pass the clearList to todolist since it is located there
            clearList={this.clearList}
            handleDelete={this.handleDelete}
            handleEdit={this.handleEdit}
          />
          <div className="mt-500 text-center capitalize futa">
          <h6 className="my-2"><i className="fas fa-guitar mx-2" />project by austine</h6>
            <i className="mx-2 fas fa-user funt"></i>
            <span className="funt">08159011732</span>
          </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
