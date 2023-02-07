import {TodoModel} from "@/api/TodoModel";

export class TodoController{
    constructor(filters) {
        this.filters = filters;
        this.todoModel = new TodoModel();
    }

    getListTodos() {
        return this.todoModel.getList(this.filters);
    }
    getLoaderStatus() {
        return this.todoModel.loader;
    }
    setListTodos() {
        return this.todoModel.setList();
    }
}
