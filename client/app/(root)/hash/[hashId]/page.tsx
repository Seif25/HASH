// *COMPONENTS
import CommentCard from "@/components/cards/CommentCard";

// *ACTIONS
import { getHash, view } from "@/lib/actions/hash.actions";

// *UTILS
import type { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: { hashId: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const hashId = params.hashId
 
  // fetch data
  const hash = await getHash(hashId)
 
 
  return {
    title: `${hash.author.name} on Hash: ${hash.text}`,
  }
}

export default async function Hash({ params }: { params: { hashId: string } }) {
  // TODO: Implement increasing view count
  // await view(params.hashId);
  return <CommentCard hashId={params.hashId} isChild={false} isComment={true} />;
}
