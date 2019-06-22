import React from "react";

class TodoInput extends React.Component {
  render() {
    return (
      <div>
        <input onChange={event => this.props.handleOnChange(event)} />
      </div>
    );
  }
}

export default TodoInput;
