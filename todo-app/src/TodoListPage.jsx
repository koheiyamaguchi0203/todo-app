import React from "react";

const TodoListPage = () => {
  return (
    <React.Fragment>
      <div>
        <input />
        <input type="submit" value="Todoを追加する" />
      </div>
      <div>
        <div>Todoのものだけ表示する</div>
        <div>Archiveされたものだけを表示する</div>
        <div>全て表示する</div>
      </div>
      <div>
        <div>Todo1</div>
        <div>Todo2</div>
        <div>Todo3</div>
      </div>
    </React.Fragment>
  );
};

export default TodoListPage;
