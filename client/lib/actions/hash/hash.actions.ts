"use server"

import clientPromise from "@/lib/database/mongodb";
import { Document, WithId } from "mongodb";
import HashModel from "@/lib/models/hash.model";

export async function fetchHashesAction<T extends Document | WithId<Document>>(
    pageNumber: number = 1,
    pageSize: number = 10,
    user: string = ""
): Promise<{ hashes: T[], isNext: boolean} | null> {
    const client = await clientPromise

      // Populate the author field.
  const pipeline = [
    {
        $lookup: {
          from: 'users',
          localField: 'author',
          foreignField: 'username',
          as: 'author',
        },
      },
      {
        $lookup: {
          from: 'hashes',
          localField: 'children',
          foreignField: '_id',
          as: 'children',
        },
      },
      {
        $project: {
          author: {
            username: 1,
            name: 1,
            image: 1,
            verified: 1,
            following: 1,
            followers: 1,
          },
          children: {
            // Populate the author field in the children documents.
            $lookup: {
              from: 'users',
              localField: 'author',
              foreignField: 'username',
              as: 'author',
            },
            $project: {
                author: {
                  username: 1,
                  name: 1,
                  image: 1,
                  verified: 1,
                  following: 1,
                  followers: 1,
                },
            }
          },
        },
      },
    ]

    const collection = client.db('test').collection('hashes')
    collection.aggregate(pipeline)

    // Query Options
    const skip = (pageNumber - 1) * pageSize
    const limit = pageSize

    const query = {
        parentId: { $in: [null, undefined] },
        // author: { $neq: user }
    }

  const results = await collection.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).toArray()
  const JsonResults = JSON.parse(JSON.stringify(results))
  console.log(JsonResults)

    if (results) {
        return {
            hashes: JsonResults as T[],
            isNext: false
        }
    } else {
        return null
    }
}