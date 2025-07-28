import db from "../../../db";
import { advocates } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";
import { sql, count } from "drizzle-orm";

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = 5;
  const offset = (page - 1) * limit;

  try {
    // Use Drizzle ORM for proper pagination
    const data = await db.select().from(advocates).orderBy(advocates.lastName).limit(limit).offset(offset);

    // Get total count using Drizzle
    const totalCountResult = await db.select({ count: count() }).from(advocates);
    const totalItems = totalCountResult[0]?.count || 0;
    const totalPages = Math.ceil(totalItems / limit);

    const pagination: Pagination = {
      currentPage: page,
      totalPages,
      totalItems,
      itemsPerPage: limit,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1
    };

    return Response.json({ 
      data,
      pagination
    });
  } catch (error) {
    return Response.json({ error: "Database error" }, { status: 500 });
  }
}
