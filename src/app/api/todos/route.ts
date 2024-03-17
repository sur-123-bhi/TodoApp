import { NextResponse } from "next/server";
import { db, todos } from "../../../lib/drizzle";
import { revalidateTag } from "next/cache";
import { eq } from "drizzle-orm";

import { setWithTTL, get } from "../../utils/redisUtil";

export async function GET(request: Request) {
  const key = "userId";
  const ttl = 60 * 60 * 4;

  console.log(123);

  let todosData;
  try {
    todosData = await get(key);
    console.log("Value:", todosData);
  } catch (error) {
    console.error("Failed to get value:", error);
  }
  console.log(todosData, "PRINTING todosData");

  if (!todosData) {
    todosData = await db.select().from(todos);
    await setWithTTL(key, todosData, ttl);
  }
  console.log(todosData);
  return NextResponse.json({
    msg: "Get req working successfully",
    todos: todosData,
  });
}

export async function POST(request: Request) {
  const newTodo = await request.json();
  await db.insert(todos).values(newTodo);

  const key = "userId";
  const ttl = 60 * 60 * 4;
  let todosData = await db.select().from(todos);
  await setWithTTL(key, todosData, ttl);

  // revalidateTag("todosupdate")
  return NextResponse.json({ msg: "new todo created" });
}

export async function PATCH(request: Request) {
  const updatedTodo = await request.json();
  await db.update(todos).set(updatedTodo).where(eq(todos.id, updatedTodo.id));

  // revalidateTag("todosupdate")

  const key = "userId";
  const ttl = 60 * 60 * 4;
  let todosData = await db.select().from(todos);
  await setWithTTL(key, todosData, ttl);

  return NextResponse.json({ msg: "todo updated" });
}

export async function DELETE(request: Request) {
  // const { id } = request.params;
  // await db.delete(todos).where(eq(todos.id));

  // revalidateTag("todosupdate")

  const key = "userId";
  const ttl = 60 * 60 * 4;
  let todosData = await db.select().from(todos);
  await setWithTTL(key, todosData, ttl);

  return NextResponse.json({ msg: "todo deleted" });
}
