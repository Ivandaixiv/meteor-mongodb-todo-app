import { Mongo } from "meteor/mongo";

// Todos is a table
export const ToDos = new Mongo.Collection("todos");

if (Meteor.isServer) {
  Meteor.publish("todos", function todosPublication() {
    return ToDos.find({ owner: this.userId });
  });
}
Meteor.methods({
  // How to write a method in Meteor methods
  "todos.toggleComplete"(todo) {
    if (todo.owner !== this.userId) {
      // Checks if the user matches
      throw new Meteor.Error(
        "todos.toggleComplete.not-authorized",
        "You are not allowed to update to-dos for other users."
      );
    }
    // change the complete status
    ToDos.update(todo._id, {
      $set: { complete: !todo.complete }
    });
  },
  "todos.removeToDo"(todo) {
    if (todo.owner !== this.userId) {
      // Checks if the user matches
      throw new Meteor.Error(
        "todos.toggleComplete.not-authorized",
        "You are not allowed to remove to-dos for other users."
      );
    }
    ToDos.remove(todo._id);
  },
  "todos.removeCompleted"() {
    if (!this.userId) {
      // Checks if the user matches
      throw new Meteor.Error(
        "todos.toggleComplete.not-authorized",
        "You are not allowed to remove to-dos for other users."
      );
    }
    //   Doesnt get this.props
    ToDos.remove({ owner: this.userId, complete: true });
  },
  "todos.addToDo"(inputValue) {
    if (!this.userId) {
      // Checks if the user matches
      throw new Meteor.Error(
        "todos.toggleComplete.not-authorized",
        "You are not allowed to add to-dos."
      );
    }

    ToDos.insert({
      title: inputValue,
      complete: false,
      owner: this.userId
    });
  }
});
