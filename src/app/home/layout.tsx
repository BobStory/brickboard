import '../shared/globals.css'
import type { Metadata } from 'next'
import Navigation from '../shared/nav/nav'
import Sidemap from '../shared/sidemap/sidemap'

export const metadata: Metadata = {
  title: 'Brickboard'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body >
        <Navigation render={{
          locationHint: false,
          locationHintContent: []
        }} />
        <Sidemap
          highlight_module={undefined}
          render={{
            jump_back: false
          }} />
        {children}
      </body>
    </html>
  )
}