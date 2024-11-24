import nfts from "@/data/meta.json";

export async function GET(request: Request) {
  console.log('Current working directory:', process.cwd());
  const url = new URL(request.url);
  const hash = parseInt((url.searchParams.get("hash") ?? "0"), 10);
  return new Response(""+nfts.hashes[hash], { status: 200 });
}

export async function POST(request: Request) {
  const body = await request.json();
  const data = JSON.stringify(body);
  nfts.hashes.push(data);
  return new Response(""+(nfts.hashes.length-1), { status: 200 });
}