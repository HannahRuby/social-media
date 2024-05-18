import { ClerkProvider, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import "./globals.css";
import { db } from "@/lib/db";
import Header from "@/components/Header/Header.jsx";
import Footer from "@/components/Footer/Footer.jsx";
import ProfileForm from "@/components/ProfileForm";
import "@radix-ui/themes/styles.css";
import AllPosts from "./allposts/page";
import { Theme, ThemePanel } from "@radix-ui/themes";

export default async function RootLayout({ children }) {
  // Get the userId from auth() -- if null, the user is not signed in
  const { userId } = auth();

  const profiles = await db.query(
    `SELECT * FROM profiles WHERE clerk_id = '${userId}'`
  );

  // if the user is logged in AND they don't have an entry in the profiles table, add it

  if (profiles.rowCount === 0 && userId) {
    // add them to our database

    await db.query(`INSERT INTO profiles (clerk_id) VALUES ('${userId}')`);
  }

  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Header>
            <SignedOut>
              <AllPosts />
            </SignedOut>
            <SignedIn>
              <profile />
              <posts />
              <ProfileForm />
            </SignedIn>
          </Header>
          <Theme
            accentColor="crimson"
            grayColor="sand"
            radius="large"
            scaling="95%"
          >
            <main>{children}</main>
            <ThemePanel />
          </Theme>
          <Footer></Footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
