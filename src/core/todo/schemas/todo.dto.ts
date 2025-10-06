export type TTodo = {
  id: string;
  description: string;
  createdAt: string;
};

export type TInvalidTodo = {
  success: false;
  errors: string[];
};

export type TValidTodo = {
  success: true;
  todo: TTodo;
};

export type TodoDTO = TValidTodo | TInvalidTodo;
