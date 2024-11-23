'use client'

import { AppHero } from '../ui/ui-layout'

const links: { label: string; href: string }[] = [
  { label: 'Event 1', href: 'https://docs.solana.com/' },
  { label: 'Event 2', href: 'https://faucet.solana.com/' },
  { label: 'Event 3', href: 'https://solanacookbook.com/' },
]

export default function DashboardFeature() {
  return (
    <div>
      <div className="hero py-10">
        <div className="hero-content text-center">
          <div className="max-w-xl">
            {/* Search bar with filter button */}
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Search..."
                className="input input-bordered input-lg flex-grow"
              />
              <button className="btn btn-primary btn-lg">
                Filter
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-xl mx-auto py-6 sm:px-6 lg:px-8 text-center">
        <div className="space-y-2">
          {/* Changed from Links to Event Display*/} 
          <p>Current Events:</p>
          {links.map((link, index) => (
            <div key={index}>
              <a href={link.href} className="link" target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
