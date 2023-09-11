import CommentCard from "@/components/cards/CommentCard";
import { getHash, view } from "@/lib/actions/hash.actions";
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

async function Hash({ params }: { params: { hashId: string } }) {
  await view(params.hashId);
  return <CommentCard hashId={params.hashId} isChild={false} />;
}

export default Hash;
