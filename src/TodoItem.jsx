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
        todoItemTitle: prevProps.todoItem.title,
        isEditing: prevState.isEditing
      });
    }
  }

  render() {
    if (this.state.isEditing) {
      return (
        <>
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
                this.props.todoItem
              );
              this.setState({ isEditing: false });
            }}
          >
            保存する
          </div>
          <br />
        </>
      );
    } else {
      return (
        <>
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
          <div onClick={() => this.props.archiveTodo(this.props.todoItem)}>
            {this.props.todoItem.archived ? "Todo" : "Archive"}
          </div>
          <div onClick={() => this.setState({ isEditing: true })}>編集する</div>
          <br />
        </>
      );
    }
  }
}

export default TodoItem;
