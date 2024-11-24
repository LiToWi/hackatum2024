import {
    create,
    mplCore,
  } from "@metaplex-foundation/mpl-core";
  import {
    createSignerFromKeypair,
    generateSigner,
    signerIdentity,
    sol,
  } from "@metaplex-foundation/umi";
  import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
  import { base58 } from "@metaplex-foundation/umi/serializers";
  
  export const createNft = async ({ name, month, year}) => {
    const keyData = [
      192, 66, 42, 87, 240, 4, 212, 148, 54, 67, 69, 137, 197, 252, 35, 77, 14,
      176, 140, 86, 140, 159, 168, 19, 63, 96, 82, 197, 85, 176, 108, 75, 174,
      112, 224, 21, 160, 250, 177, 167, 35, 113, 44, 201, 0, 209, 63, 189, 103,
      31, 121, 43, 228, 211, 239, 8, 159, 191, 236, 53, 181, 252, 150, 194,
    ];
  
    const umi = createUmi("https://api.devnet.solana.com").use(mplCore());
    const kp = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(keyData));
    const admin = createSignerFromKeypair(umi, kp);
    umi.use(signerIdentity(admin));
  

    const badgeUri = "https://ivory-rear-earthworm-308.mypinata.cloud/ipfs/QmZeoV4wmBX1FNdMe8WrC6Rwpjh82LpqeRqqWYket7BS1e"
    const logoUri = "https://ivory-rear-earthworm-308.mypinata.cloud/ipfs/QmSeknpbhviWsbcQBBjYeXR7GzjHqWAb7rp656GhCSsrL6"
  
    const metadata = {
      name: name,
      image: logoUri,
      description: "Shows your badge earned",
      external_url: "https://localhost:3000",
      attributes: [
        { trait_type: "Month", value: month },
        { trait_type: "Year", value: year },
      ],
      properties: {
        files: [
          { uri: badgeUri, type: "image/png" },
          { uri: logoUri, type: "image/png" },
        ],
        category: "image",
      },
      creators: [kp.publicKey],
    };
  
    try {
      const response = await fetch("http://localhost:3000/api/nft", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(metadata),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to POST metadata: ${response.status} ${errorText}`);
      }
      console.log(response)
  
      const responseBody = await response.json(); // Assuming server returns JSON
      const metadataUri = `http://localhost:3000/api/nft?hash=${responseBody}`;
  
      const asset = generateSigner(umi);
  
      console.log("Creating NFT...");
  
      const tx = await create(umi, {
        asset,
        name: name,
        uri: metadataUri,
      }).sendAndConfirm(umi);
  
      const signature = base58.deserialize(tx.signature)[0];
  
      console.log("\nNFT Created");
      console.log("View Transaction on Solana Explorer:");
      console.log(`https://explorer.solana.com/tx/${signature}?cluster=devnet`);
      console.log("\nView NFT on Metaplex Explorer:");
      console.log(`https://core.metaplex.com/explorer/${asset.publicKey}?env=devnet`);
    } catch (error) {
      console.error("Error creating NFT:", error);
    }
  };
  
  // example
  createNft({
    name: "Thomas Miller",
    month: "November",
    year: "2024",
    badge: "https://ivory-rear-earthworm-308.mypinata.cloud/ipfs/QmZeoV4wmBX1FNdMe8WrC6Rwpjh82LpqeRqqWYket7BS1e",
    logo: "https://ivory-rear-earthworm-308.mypinata.cloud/ipfs/QmSeknpbhviWsbcQBBjYeXR7GzjHqWAb7rp656GhCSsrL6",
  });
  