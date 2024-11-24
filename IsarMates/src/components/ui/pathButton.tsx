'use client'

import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createNft } from 'src/app/create_nft'

interface PathButtonProps {
    name: string;
    path_to: string;
    tailwind: string;
}

export default function PathButton({ name, path_to , tailwind}: PathButtonProps) {
    const { publicKey } = useWallet()

    if (!publicKey) {  
        return (
            <Link href='/account'>
                <button className={tailwind}>{name}</button>
            </Link>
        );
    }

    localStorage.setItem("pub_key", JSON.stringify(publicKey.toString()));

    if (name === "Claim NFT Rewards") {
        return (
            <Link href={"/nfts"}>
                <button onClick={() => {createNft({ name: "Test", month: "12", year: "2024" });}} 
                className={tailwind}>{name}
                </button>
            </Link>
        );
    }
    else {
        return (
            <Link href={`${path_to}`}>
                <button className={tailwind}>{name}</button>
            </Link>
        );
    }
}
