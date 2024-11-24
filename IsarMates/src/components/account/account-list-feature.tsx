'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import { WalletButton } from '../solana/solana-provider'

import { redirect } from 'next/navigation'

export default function AccountListFeature() {
  const { publicKey } = useWallet()

  if (publicKey) {
    return redirect(`/account/${publicKey.toString()}`)
  }

  return (
    <div className='flex mt-[10%] flex-col justify-center items-center'>
      <h1 className='text-4xl'> Please Login with your Wallet first!</h1>
      <img className="w-[80%]" src='./Wallet-amico.svg'/>
    </div>
  );
}
