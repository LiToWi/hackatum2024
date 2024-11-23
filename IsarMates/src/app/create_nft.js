import { create, mplCore } from '@metaplex-foundation/mpl-core'
import {
  createGenericFile,
  generateSigner,
  signerIdentity,
  sol,
} from '@metaplex-foundation/umi'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
//import { irysUploader } from '@metaplex-foundation/umi-uploader-irys'
import { base58 } from '@metaplex-foundation/umi/serializers'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters'
import { useWallet } from '@solana/wallet-adapter-react'
import { Keypair } from '@solana/web3.js'
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom'

// Create the wrapper function
const createNft = async ({name, month, year, badge, logo}) => {
    
    const wallet = useWallet()

    const umi = createUmi('https://api.devnet.solana.com')
    .use(mplCore())
    .use(walletAdapterIdentity(wallet))

    const metadata = {
        name: name,
        description: 'Badge earned for ${month} ${year}',
        image: badge,
        external_url: 'https://localhost:3000',
        attributes: [
          {
            trait_type: 'Badge Month',
            value: month,
          },
          {
            trait_type: 'Badge Year',
            value: year,
          },
        ],
        properties: {
          files: [
            {
              uri: badge,
              type: 'image/png',
            },
            {
                uri: logo,
                type: 'image/png'
            },
          ],
          category: 'image',
        },
        logo: logo,
      }

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const metadataFilePath = path.join(__dirname, 'metadata.json');
    fs.writeFileSync(metadataFilePath, JSON.stringify(metadata, null, 2), 'utf-8')


    const asset = generateSigner(umi)

    console.log('Creating NFT...')
    const tx = await create(umi, {
        asset,
        name: name,
        uri: 'metadata.json',
    }).sendAndConfirm(umi)

    // Finally we can deserialize the signature that we can check on chain.
    const signature = base58.deserialize(tx.signature)[0]

    console.log('\nNFT Created')
    console.log('View Transaction on Solana Explorer')
    console.log(`https://explorer.solana.com/tx/${signature}?cluster=devnet`)
    console.log('\n')
    console.log('View NFT on Metaplex Explorer')
    console.log(`https://core.metaplex.com/explorer/${nftSigner.publicKey}?env=devnet`)
}

// run the wrapper function
createNft({
    name: 'Thomas Miller',
    month: 'November',
    year: '2024',
    badge: 'badges_part1.png',
    logo: 'Logo.png'
})