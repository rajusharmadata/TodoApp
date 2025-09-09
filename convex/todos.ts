import {mutation, query} from "./_generated/server"
import { ConvexError, v } from 'convex/values'
// get todo  find the todo
export const getTodos = query({
  handler: async (ctx) => {
    const todos = await ctx.db.query('todos').order('desc').collect();
    return todos;
  }
});
// add Todo
export const addTodo = mutation({
  args: {text: v.string()},
  handler: async(ctx,args)=> {
    const todoId = await ctx.db.insert('todos', {
      text: args.text,
      isCompleted: false,
    });
    return todoId;

  }
})
//    -------------------------------------update status --------------------------------------------------

//update the Todo When todo is exits when not exits then return the error which is not found todo
export const togglTodo = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, args) => {
    const todo = await ctx.db.get(args.id)
    if (!todo) throw new ConvexError("Todo not found ")
    await ctx.db.patch(args.id, {
      isCompleted:!todo.isCompleted
    })
  }

})
// delete todo mutation
export  const deleteTodo = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
})
// ------------------------------update Todo text ------------------------------------
// update Todo
export const updateTodo = mutation({
  args: {
    id: v.id("todos"),
    text: v.string(),

  },
  handler: async (ctx, args) => {
    // patch used to the update todos
    await ctx.db.patch(args.id, {
      text:args.text,
    })
  }

})
// clear all todos
export const clearAllTodos = mutation({
  handler: async (ctx) => {
    const todos = await ctx.db.query("todos").collect();
    // delete all todos
    for (const todo of todos) {
      await ctx.db.delete(todo._id)
    }

    // return
    return {deletedCount:todos.length}
  }
})
