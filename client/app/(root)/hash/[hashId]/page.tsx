import HashCard from "@/components/cards/HashCard";
import { getHash } from "@/lib/actions/hash.actions";

async function Hash({ params }: { params: { hashId: string } }) {
  const hash = await getHash(params.hashId);
  return (
    <div>
      {/* <HashCard id={params.hashId} /> */}
      <pre>
        <code>{JSON.stringify(hash, null, 2)}</code>
      </pre>
    </div>
  );
}

export default Hash;
