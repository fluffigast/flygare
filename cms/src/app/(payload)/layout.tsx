import React from 'react'

export const metadata = {
  title: 'Flygare CMS',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <body>{children}</body>
    </html>
  )
}
