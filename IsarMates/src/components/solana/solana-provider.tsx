'use client'

import dynamic from 'next/dynamic'
import { AnchorProvider } from '@coral-xyz/anchor'
import { WalletError } from '@solana/wallet-adapter-base'
import {
    AnchorWallet,
    useConnection,
    useWallet,
    ConnectionProvider,
    WalletProvider,
} from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { ReactNode, useCallback, useMemo } from 'react'
import { useCluster } from '../cluster/cluster-data-access'
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'


require('@solana/wallet-adapter-react-ui/styles.css')

export const WalletButton = dynamic(async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton, {
    ssr: false,
})

export function SolanaProvider({ children }: { children: ReactNode }) {
    const { cluster } = useCluster()
    const endpoint = useMemo(() => cluster.endpoint, [cluster])
    const onError = useCallback((error: WalletError) => {
        console.error(error)
    }, [])
    const network = WalletAdapterNetwork.Devnet
    const wallets = useMemo(
        () => [new PhantomWalletAdapter()],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [network]
    )

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={[]} onError={onError} autoConnect={true}>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    )
}

export function useAnchorProvider() {
    const { connection } = useConnection()
    const wallet = useWallet()

    return new AnchorProvider(connection, wallet as AnchorWallet, { commitment: 'confirmed' })
}
