/*
todo_path  GET     /api/v1/todos                          TodoAppApiWeb.TodoController :index
todo_path  GET     /api/v1/todos/:id                      TodoAppApiWeb.TodoController :show
todo_path  POST    /api/v1/todos                          TodoAppApiWeb.TodoController :create
todo_path  PATCH   /api/v1/todos/:id                      TodoAppApiWeb.TodoController :update
           PUT     /api/v1/todos/:id                      TodoAppApiWeb.TodoController :update
todo_path  DELETE  /api/v1/todos/:id                      TodoAppApiWeb.TodoController :delete
*/

export const getApiV1Todos = () => "/api/v1/todos";
export const postApiV1Todos = () => "/api/v1/todos";
export const patchApiV1Todos = params => `/api/v1/todos/${params.id}`;
export const deleteApiV1Todos = params => `/api/v1/todos/${params.id}`;
