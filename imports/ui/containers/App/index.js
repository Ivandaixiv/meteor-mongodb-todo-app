import React from "react";
import ToDoInput from "../../components/ToDoInput";
import ClearButton from "../../components/ClearButton";
import ToDoCount from "../../components/ToDoCount";
import ToDoItem from "../../components/ToDoItem";
import Header from "../../components/Header";
import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      lastId: -1
    };

    this.toDoInput = React.createRef();
  }

  componentDidMount() {
    this.toDoInput.current.focus();
  }

  toggleComplete = item => {
    let todos = this.state.todos.map(todo => {
      if (todo.id === item.id) todo.complete = !todo.complete;
      return todo;
    });
    this.setState({ todos });
  };

  removeTodo = item => {
    let todos = this.state.todos.filter(todo => todo.id !== item.id);
    this.setState({ todos });
  };

  removeCompleted = () => {
    let todos = this.state.todos.filter(todo => !todo.complete);
    this.setState({ todos });
  };

  hasCompleted = () => {
    let hasCompleted = this.state.todos.filter(todo => todo.complete);
    return hasCompleted.length > 0 ? true : false;
  };

  addToDo = event => {
    event.preventDefault();
    let toDoInput = this.toDoInput.current;

    if (toDoInput.value) {
      const id = this.state.lastId + 1;
      const newToDo = [
        ...this.state.todos,
        { id, title: toDoInput.value, complete: false }
      ];
      this.setState({ lastId: id, todos: newToDo });
    }

    toDoInput.value = "";
  };

  render() {
    let { todos } = this.state;
    let number = todos.length;
    return (
      <div className="todo-list">
        <Header title="So Much To Do" />
        <ToDoInput addToDo={this.addToDo} ref={this.toDoInput} />
        <ul>
          {todos.map(todo => {
            return (
              <ToDoItem
                key={todo.id}
                todo={todo}
                creator="Ivan"
                toggleComplete={() => {
                  this.toggleComplete(todo);
                }}
                removeTodo={() => this.removeTodo(todo)}
              />
            );
          })}
        </ul>
        <div className="todo-admin">
          <ToDoCount number={number} />
          {this.hasCompleted() && (
            <ClearButton removeCompleted={this.removeCompleted} />
          )}
        </div>
      </div>
    );
  }
}
export default App;
