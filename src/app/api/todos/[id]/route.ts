import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { eq } from "drizzle-orm";
import { db, todos } from "../../../../lib/drizzle";

export async function PATCH(request: Request, {params}: {params: {id: number}}) {
    const id = params.id;
    const updatedTodo = await request.json();
    await db
      .update(todos)
      .set(updatedTodo)
      .where(eq(todos.id, id));
  
    // revalidateTag("todosupdate")
    return NextResponse.json({ msg: `todo with ${id} id is updated`});
  }
  
  export async function DELETE(request: Request, {params}: {params: {id: number}}) {
    const id = params.id;
      await db.delete(todos).where(eq(todos.id, id));
    
      // revalidateTag("todosupdate")
      return NextResponse.json({ msg: "todo deleted" });
  }
  