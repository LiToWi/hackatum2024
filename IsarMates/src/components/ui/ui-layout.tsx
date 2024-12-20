'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'
import * as React from 'react'
import {ReactNode, Suspense, useEffect, useRef} from 'react'
import toast, {Toaster} from 'react-hot-toast'

import {AccountChecker} from '../account/account-ui'
import {ClusterChecker, ClusterUiSelect, ExplorerLink} from '../cluster/cluster-ui'
import {WalletButton} from '../solana/solana-provider'
import PathButton from './pathButton'
import { useRouter } from "next/navigation"; // Correct import for useRouter in "use client" context

/* Inserted picture "Logo" ?? */
/*import {EventButton} from '../event/event-ui' ??*/
  

export function UiLayout({ children, links }: { children: ReactNode; links: { label: string; path: string }[] }) {
  const pathname = usePathname()
  const [showAccountMenu, setShowAccountMenu] = React.useState(false)
  const router = useRouter(); // Initialize the router instance

  return (
    <div className="h-full flex flex-col">
      <div className="navbar bg-base-300 text-neutral-content flex-col md:flex-row space-y-2 md:space-y-0">
        <div className="flex-1">
          <Link className="btn btn-ghost normal-case text-xl" href="/">
            {/* Inserted picture "Logo" */}
            <img className="h-4 md:h-12" alt="Logo" src="/logos/Logo.png" />
            
          
          {/* Inserted text "IsarMates" */}
          <span className="ml-2 text-xl font-semibold">IsarMates</span>
          </Link>
          
          <ul className="menu menu-horizontal px-1 space-x-2">
            {links.map(({ label, path }) => (
              <li key={path}>
                <Link className={pathname.startsWith(path) ? 'active' : ''} href={path}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-none flex items-center space-x-2 ml-auto">
          {/* <WalletButton /> */}
          {/*<AccountChecker /> */}
          {/* <ClusterUiSelect /> */}
          {/* new Buttons on the Right */}
          
          
          <WalletButton />
          
          <Link href={"/events"}>
            <button className={"btn btn-primary"}>{"Discover Events"}</button>
          </Link>
          

          <PathButton name="Claim NFT Rewards" path_to="/nfts" tailwind="btn btn-primary" />
          
          <div className="dropdown dropdown-end">
            <button
              className="btn btn-primary"
              onClick={() => setShowAccountMenu(!showAccountMenu)}
            >
              Account
            </button>
            {showAccountMenu && (
              <ul tabIndex={0} className="dropdown-content menu p-1 shadow bg-base-100 rounded-box w-32">
                <li>
                  <PathButton name="My Events" path_to="/my-events" tailwind="btn btn-xs lg:btn-md btn-outline" />
                </li>
                <li>
                  <PathButton name="My Profile" path_to="/account" tailwind="btn btn-xs lg:btn-md btn-outline" />
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
      <ClusterChecker>
        <AccountChecker />
      </ClusterChecker>
      <div className="flex-grow mx-4 lg:mx-auto">
        <Suspense
          fallback={
            <div className="text-center my-32">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          }
        >
          {children}
        </Suspense>
        <Toaster position="bottom-right" />
      </div>
      <footer className="footer footer-center p-4 bg-base-300 text-base-content">
        <aside>
          <p>
            <a
              className="link hover:text-white"
              href="https://github.com/LiToWi/hackatum2024"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
             {' '} // IsarMates by Oskar, Mika, Linus and Fabian for HackaTUM2024
          </p>
        </aside>
      </footer>
    </div>
  )
}

export function AppModal({
  children,
  title,
  hide,
  show,
  submit,
  submitDisabled,
  submitLabel,
}: {
  children: ReactNode
  title: string
  hide: () => void
  show: boolean
  submit?: () => void
  submitDisabled?: boolean
  submitLabel?: string
}) {
  const dialogRef = useRef<HTMLDialogElement | null>(null)

  useEffect(() => {
    if (!dialogRef.current) return
    if (show) {
      dialogRef.current.showModal()
    } else {
      dialogRef.current.close()
    }
  }, [show, dialogRef])

  return (
    <dialog className="modal" ref={dialogRef}>
      <div className="modal-box space-y-5">
        <h3 className="font-bold text-lg">{title}</h3>
        {children}
        <div className="modal-action">
          <div className="join space-x-2">
            {submit ? (
              <button className="btn btn-xs lg:btn-md btn-primary" onClick={submit} disabled={submitDisabled}>
                {submitLabel || 'Save'}
              </button>
            ) : null}
            <button onClick={hide} className="btn">
              Close
            </button>
          </div>
        </div>
      </div>
    </dialog>
  )
}

export function AppHero({
  children,
  title,
  subtitle,
}: {
  children?: ReactNode
  title: ReactNode
  subtitle: ReactNode
}) {
  return (
    <div className="hero py-[64px]">
      <div className="hero-content text-center">
        <div className="max-w-2xl">
          {typeof title === 'string' ? <h1 className="text-5xl font-bold">{title}</h1> : title}
          {typeof subtitle === 'string' ? <p className="py-6">{subtitle}</p> : subtitle}
          {children}
        </div>
      </div>
    </div>
  )
}

export function ellipsify(str = '', len = 4) {
  if (str.length > 30) {
    return str.substring(0, len) + '..' + str.substring(str.length - len, str.length)
  }
  return str
}

export function useTransactionToast() {
  return (signature: string) => {
    toast.success(
      <div className={'text-center'}>
        <div className="text-lg">Transaction sent</div>
        <ExplorerLink path={`tx/${signature}`} label={'View Transaction'} className="btn btn-xs btn-primary" />
      </div>,
    )
  }
}
