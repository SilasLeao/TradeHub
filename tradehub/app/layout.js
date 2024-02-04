"use client";

import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children, pageProps, session }) {
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body>{children}</body>
      </html>
    </SessionProvider>
  );
}
