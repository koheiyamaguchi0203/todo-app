import React from "react";

class InsertTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoItem: { id: "", title: "", createdAt: "", archived: false }
    };
  }

  handleOnChange = event => {
    this.setState({
      todoItem: {
        title: event.target.value,
        // UnixTimeを入れているのはJSの日付の比較する時になんか困ったから。
        // new Date("2019-07-19T15:28:23") === new Date("2019-07-19T15:28:23")
        // false
        // 上のようになるから、困った。
        createdAt: new Date().getTime(),
        archived: false
      }
    });
  };

  render() {
    return (
      <div>
        <input
          onChange={event => this.handleOnChange(event)}
          value={this.state.todoItem.title}
        />
        <input
          type="button"
          value="Todoを作成する"
          onClick={() => {
            this.setState(prevState => {
              return {
                todoItem: {
                  ...prevState.todoItem,
                  title: ""
                }
              };
            });
            this.props.handleOnClick(this.state.todoItem);
          }}
        />
      </div>
    );
  }
}

export default InsertTodo;
