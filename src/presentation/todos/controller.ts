import { Request, Response } from "express"
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { CreateTodo, DeleteTodo, GetTodo, GetTodos, TodoRepository, UpdateTodo } from "../../domain";


export class TodosController {
  //* DI
  constructor(
    private readonly todoRepsoitory: TodoRepository
  ) {}


  public getTodos = (req: Request, res: Response) => {
    new GetTodos(this.todoRepsoitory)
      .execute()
      .then(todo => res.json(todo))
      .catch(err => res.status(400).json({err}));
  }
  public getTodoById = (req: Request, res: Response) => {
    const id = +req.params.id;
    new GetTodo(this.todoRepsoitory)
      .execute(id)
      .then(todo => res.json(todo))
      .catch(err => res.status(400).json({err}));
  }

  public createTodo = (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body || {});
    if(error) return res.status(400).json({error});
    new CreateTodo(this.todoRepsoitory)
      .execute(createTodoDto!)
      .then(todo => res.status(201).json(todo))
      .catch(err => res.status(400).json({err}));
  }

  public updateTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    const [error, updateTodoDto] = UpdateTodoDto.create({...req.body, id});
    if(error) return res.status(400).json({ error });
  
    new UpdateTodo(this.todoRepsoitory)
      .execute(updateTodoDto!)
      .then(todo => res.json(todo))
      .catch(err => res.status(400).json({err}));
  }

  public deleteTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    new DeleteTodo(this.todoRepsoitory)
      .execute(id)
      .then(todo => res.json(todo))
      .catch(err => res.status(400).json({err}));
  }
}