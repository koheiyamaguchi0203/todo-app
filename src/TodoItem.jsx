import React from "react";

class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoItemTitle: this.props.todoItem.title,
      isEditing: false
    };
  }

  handleOnChange = event => {
    event.persist();
    this.setState(prevState => ({
      todoItemTitle: event.target.value,
      isEditing: prevState.isEditing
    }));
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.todoItem.id !== this.props.todoItem.id) {
      this.setState({
        todoItemTitle: "",
        isEditing: prevState.isEditing
      });
    }
  }

  render() {
    if (this.state.isEditing) {
      return (
        <React.Fragment>
          ID:{this.props.todoItem.id}
          <br />
          Title:
          <input
            value={this.state.todoItemTitle}
            onChange={event => {
              this.handleOnChange(event);
            }}
          />
          <br />
          Created At:
          {new Date(this.props.todoItem.createdAt).toLocaleDateString()}
          <div
            onClick={() => {
              this.setState(prevState => ({
                todoItemTitle: prevState.todoItemTitle,
                isEditing: false
              }));
              this.props.updateTodoItem(
                this.state.todoItemTitle,
                this.props.todoItem.id
              );
              this.setState({ isEditing: false });
            }}
          >
            保存する
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div onClick={() => this.setState({ isEditing: true })}>
            ID:{this.props.todoItem.id}
            <br />
            Title:{this.state.todoItemTitle}
            <br />
            Created At:
            {new Date(this.props.todoItem.createdAt).toLocaleDateString()}
            <br />
            <div onClick={() => this.props.deleteTodoItem(this.props.todoItem)}>
              削除する
            </div>
            {/* これに統一する */}
            <div onClick={() => this.props.archiveTodo(this.props.todoItem)}>
              {this.props.todoItem.archived ? "Todo" : "Archive"}
            </div>
            <br />
          </div>
        </React.Fragment>
      );
    }
  }
}

export default TodoItem;
