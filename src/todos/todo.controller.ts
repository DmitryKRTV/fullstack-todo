import {TodoService} from "./todo.service";
import {Body, Controller, Delete, Get, Header, HttpCode, HttpStatus, Param, Patch, Post} from "@nestjs/common";
import {CreateTodo} from "./tdo/create-todo.dto";
import {ChangeTodo} from "./tdo/change-todo.dto";

@Controller("todos")
export class TodoController {
    constructor(
        private readonly todoService: TodoService
    ) {
    }

    @Get()
    getAllTodos() {
        return this.todoService.findAll();
    }

    @Get(":id")
    getOneTodo(@Param("id") id: string) {
        return this.todoService.findOne(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Header("Content-Type", "application/json")
    createTodo(@Body() createTodo: CreateTodo) {
        return this.todoService.create(createTodo)
    }

    @Patch(":id")
    changeTodo(@Body() changeTodo: ChangeTodo, @Param("id") id: string) {
        return this.todoService.update(id, changeTodo);
    }

    @Delete(":id")
    deleteTodo(@Param("id") id: string) {
        return this.todoService.remove(id)
    }
}