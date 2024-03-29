"use client";

import { SessionProvider } from "next-auth/react";

const Layout = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body>{children}</body>
      </html>
    </SessionProvider>
  );
};

export default Layout;
