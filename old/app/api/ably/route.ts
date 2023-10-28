import Ably from "ably/promises";

export async function GET(request: Request) {
const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const client = new Ably.Realtime(process.env.ABLY_API_KEY ?? "");
  const tokenRequestData = await client.auth.createTokenRequest({
    clientId: id ?? undefined,
  });
  return Response.json(tokenRequestData);
}
