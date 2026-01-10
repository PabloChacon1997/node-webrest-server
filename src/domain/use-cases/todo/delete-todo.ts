import { UpdateTodoDto } from "../../dtos";
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";


export interface DeleteTodoUsecase {
  execute(id: number): Promise<TodoEntity>
}


export class DeleteTodo implements DeleteTodoUsecase {

  constructor(
    private readonly repository: TodoRepository
  ) {}

  execute(id: number): Promise<TodoEntity> {
    return this.repository.deleteById(id);
  }

}