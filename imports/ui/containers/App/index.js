import React from "react";
import ToDoInput from "../../components/ToDoInput";
import ClearButton from "../../components/ClearButton";
import ToDoCount from "../../components/ToDoCount";
import ToDoItem from "../../components/ToDoItem";
import Header from "../../components/Header";
import AccountsUIWrapper from "../../components/AccountWrapper";
import { ToDos } from "../../../api/todos";
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.toDoInput = React.createRef();
  }

  toggleComplete = todo => {
    ToDos.update(todo._id, {
      $set: { complete: !todo.complete }
    });
  };

  removeTodo = todo => {
    ToDos.remove(todo._id);
  };

  removeCompleted = () => {
    const completedTodos = this.props.todos
      .filter(todo => todo.complete)
      .map(todo => todo._id);
    completedTodos.map(_id => {
      ToDos.remove(_id);
    });
  };

  hasCompleted = () => {
    let hasCompleted = this.props.todos.filter(todo => todo.complete);
    return hasCompleted.length > 0 ? true : false;
  };

  addToDo = event => {
    event.preventDefault();

    let toDoInput = this.toDoInput.current;

    if (toDoInput.value) {
      ToDos.insert({
        title: toDoInput.value,
        complete: false,
        owner: this.props.userId
      });
    }

    toDoInput.value = "";
  };

  render() {
    let { todos } = this.props;
    let number = todos.length;
    return (
      <div className="appWrapper">
        {!this.props.userId ? (
          <AccountsUIWrapper />
        ) : (
          <div className="todo-list">
            <Header title="So Much To Do" />
            <ToDoInput addToDo={this.addToDo} ref={this.toDoInput} />
            <ul>
              {todos.map(todo => {
                return (
                  <ToDoItem
                    key={todo._id}
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
              <button
                onClick={() => {
                  Meteor.logout(error => {
                    console.log(error);
                  });
                }}
              >
                Logout
              </button>
              {this.hasCompleted() && (
                <ClearButton removeCompleted={this.removeCompleted} />
              )}
              <ToDoCount number={number} />
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default withTracker(() => {
  return {
    todos: ToDos.find({}).fetch(),
    userId: Meteor.userId(),
    user: Meteor.user()
  };
})(App);
