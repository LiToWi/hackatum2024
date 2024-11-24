import { create, mplCore } from '@metaplex-foundation/mpl-core'
import {
  createGenericFile,
  createSignerFromKeypair,
  generateSigner,
  signerIdentity,
  sol,
} from '@metaplex-foundation/umi'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
//////import { irysUploader } from '@metaplex-foundation/umi-uploader-irys'
import { base58 } from '@metaplex-foundation/umi/serializers'

//import fs from 'fs'
//import path from 'path'
//import { fileURLToPath } from 'url' TESTING !!!!!

import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters'
import { useWallet } from '@solana/wallet-adapter-react'
import { Keypair } from '@solana/web3.js'
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom'
import { address } from 'framer-motion/client'

// Create the wrapper function
export const createNft = async ({name, month, year}) => { // MAYBE MAKE NON EXPORT AGAIN
    
    const keyData = [192,66,42,87,240,4,212,148,54,67,69,137,197,252,35,77,14,176,140,86,140,159,168,19,63,96,82,197,85,176,108,75,174,112,224,21,160,250,177,167,35,113,44,201,0,209,63,189,103,31,121,43,228,211,239,8,159,191,236,53,181,252,150,194]
    
    const umi = createUmi('https://api.devnet.solana.com')
    .use(mplCore())
    
    /*
    .use(irysUploader({
        address: "https://devnet.irys.xyz",
    }))
    */
    
    //.use(signerIdentity(kp))

    const kp = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(keyData))
    const admin = createSignerFromKeypair(umi, kp)
    umi.use(signerIdentity(admin))
    // umi.use(kp)
    // const asset = generateSigner(umi)
    
    // await umi.rpc.airdrop(umi.identity.publicKey, sol(1)) DONT NEED for now
    
    const logoUri = "https://ivory-rear-earthworm-308.mypinata.cloud/ipfs/QmSeknpbhviWsbcQBBjYeXR7GzjHqWAb7rp656GhCSsrL6"
    const badgeUri = "https://ivory-rear-earthworm-308.mypinata.cloud/ipfs/QmZeoV4wmBX1FNdMe8WrC6Rwpjh82LpqeRqqWYket7BS1e"
    
    

    /*
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const metadataFilePath = path.join(__dirname, 'metadata.json');
    fs.writeFileSync(metadataFilePath, JSON.stringify(metadata, null, 2), 'utf-8')
    */

    const metadata = {
        name: name,
        image: logoUri,
        description: 'Shows your badge earned',
        external_url: 'https://localhost:3000',
        attributes: [
          {
            trait_type: 'Month',
            value: month,
          },
          {
            trait_type: 'Year',
            value: year,
          },
        ],
        properties: {
          files: [
            {
              uri: badgeUri,
              type: 'image/png',
            },
            {
                uri: logoUri,
                type: 'image/png'
            },
          ],
          category: 'image',
        },
        creators: [kp.publicKey]
      }
    
    await fetch("https://localhost:3000/api/nft", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(metadata),
    }).then((response) => {
    if (response.ok) {
        console.log("POST request successful!");
    } else {
        console.error("Failed to POST data", response.statusText);
    }
    })
    console.log(response)

    const metadataUri = `http://localhost:3000/api/nft?hash=${response}` 

    const asset = generateSigner(umi)
    
    //const asset = keypair

    console.log('Creating NFT...')

    
    const tx = await create(umi, {
        asset,
        name: name,
        uri: metadataUri,
    }).sendAndConfirm(umi)
    

    // Finally we can deserialize the signature that we can check on chain.
    const signature = base58.deserialize(tx.signature)[0]

    console.log('\nNFT Created')
    console.log('View Transaction on Solana Explorer')
    console.log(`https://explorer.solana.com/tx/${signature}?cluster=devnet`)
    console.log('\n')
    console.log('View NFT on Metaplex Explorer')
    console.log(`https://core.metaplex.com/explorer/${asset.publicKey}?env=devnet`)
}

// run the wrapper function
createNft({
    name: 'Thomas Miller',
    month: 'November',
    year: '2024',
    badge: 'badges_part1.png',
    logo: 'Logo.png'
})