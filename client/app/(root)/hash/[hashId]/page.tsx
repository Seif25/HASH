import CommentCard from "@/components/cards/CommentCard";

async function Hash({ params }: { params: { hashId: string } }) {
  
  return <CommentCard hashId={params.hashId} isChild={false}/>;
}

export default Hash;
