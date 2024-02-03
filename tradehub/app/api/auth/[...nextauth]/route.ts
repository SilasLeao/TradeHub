import { NextApiHandler } from "next";
import { createClient } from "@supabase/supabase-js";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const supabaseUrl = "https://njjjjpkgxodlrhrysbev.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qampqcGtneG9kbHJocnlzYmV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE4MTg1MzQsImV4cCI6MjAxNzM5NDUzNH0.BJ8RAHt3jHIAJgq9vD1P8_gaWI-R-zn9AbGN71zyItc";
const supabase = createClient(supabaseUrl, supabaseKey);

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (!profile?.email) {
        throw new Error("No profile");
      }

      const { data, error } = await supabase
        .from("Usuario")
        .upsert([{ email: profile.email, name: profile.name }], {
          onConflict: "email",
        });

      if (error) {
        throw new Error("Failed to upsert user");
      }

      return true;
    },
  },
};

const handler: NextApiHandler = (req, res) => NextAuth(req, res, authOptions);

export default handler;
