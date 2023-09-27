"use server";
import moment from "moment";
import TagModel from "../models/tag.model";
import { initializeMongoConnection, isConnected } from "../mongoose.middleware";
import { Tag } from "@/utils/types/tag.types";

async function connectToDB() {
  if (!isConnected) {
    await initializeMongoConnection();
  }
}

const lastWeek = moment().subtract(1, "week").toDate();

export async function suggestTags(query: string): Promise<Tag[]> {
  // connect to db
  await connectToDB();

  console.log(query);

  try {
    // find tags
    if (query.length === 0) {
      const tags = await TagModel.find(
        { lastUsed: { $gte: lastWeek } },
        { limit: 10, sort: { count: -1 } }
      ).select("tag")
      return tags
    }
    const tags = await TagModel.find({ tag: { $regex: query, $options: "i" } })
      .limit(10)
      .sort({ count: -1 })
      .select("tag")
      return tags
  } catch (error: any) {
    throw new Error(
      `Failed to retrieve tags with query: ${query} -  ${error.message}`
    );
  }
}
