import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import TodoListPage from "./TodoListPage";
import * as serviceWorker from "./serviceWorker";

// const date = new Date()

// const todoItems = [
//   {
//     id: 1,
//     title: "買い物に行く",
//     archived: false,
//     createdAt: new Date(date.setDate(10)).getTime()
//   },
//   {
//     id: 2,
//     title: "デートする",
//     archived: false,
//     createdAt: new Date(date.setDate(9)).getTime()
//   },
//   {
//     id: 3,
//     title: "サバゲーする",
//     archived: false,
//     createdAt: new Date(date.setDate(8)).getTime()
//   },
//   {
//     id: 4,
//     title: "プログラミングする",
//     archived: false,
//     createdAt: new Date(date.setDate(7)).getTime()
//   }
// ];
ReactDOM.render(<TodoListPage />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
