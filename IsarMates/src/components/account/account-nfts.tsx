import { Metaplex, keypairIdentity, irysStorage } from "@metaplex-foundation/js";
import { Connection, clusterApiUrl, Keypair } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("mainnet-beta"));
const wallet = Keypair.generate();

const metaplex = Metaplex.make(connection)
    .use(keypairIdentity(wallet))
    .use(irysStorage());

const myNfts = await metaplex.nfts().findAllByOwner({
    owner: metaplex.identity().publicKey
});

export default function AccountNfts() {
    return (
        <div>
            <h1>My NFTs</h1>
            <ul>
                {myNfts.map(nft => (
                    <li key={nft.editionNonce}>
                        <p>{nft.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}