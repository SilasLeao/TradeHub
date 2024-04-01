"use client";

import { SessionProvider } from "next-auth/react";

export default function Layout({ children }) {
  return (
    <SessionProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </SessionProvider>
  );
}
