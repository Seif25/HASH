"use server";
import moment from "moment";
import TagModel from "../../app/lib/models/tag.model";
import {
  initializeMongoConnection,
  isConnected,
} from "../../app/lib/mongoose.middleware";
import { TagType } from "@/app/lib/types/tag.types";

async function connectToDB() {
  if (!isConnected) {
    await initializeMongoConnection();
  }
}

const lastWeek = moment().subtract(1, "week").toDate();

export async function suggestTags(query: string): Promise<TagType[]> {
  // connect to db
  await connectToDB();

  try {
    // find tags
    if (query.length === 0) {
      const tags = await TagModel.find(
        { lastUsed: { $gte: lastWeek } },
        { limit: 10, sort: { count: -1 } }
      ).select("tag");
      return tags;
    }
    const tags = await TagModel.find({ tag: { $regex: query, $options: "i" } })
      .limit(10)
      .sort({ count: -1 })
      .select("tag");
    return tags;
  } catch (error: any) {
    throw new Error(
      `Failed to retrieve tags with query: ${query} -  ${error.message}`
    );
  }
}

export async function getTrendingTags(): Promise<TagType[]> {
  await connectToDB();

  try {
    return await TagModel.find({
      lastUsed: { $gte: moment().subtract(6, "hour").toDate() },
      count: { $gte: 1 },
    })
      .sort({ count: -1 })
      .limit(10)
      .select("tag lastUsed");
  } catch (error: any) {
    console.log(error);
    return [];
  }
}
