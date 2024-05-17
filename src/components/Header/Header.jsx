// import Link from "next/link";
import { SignedIn, UserButton, SignOut } from "@clerk/nextjs";
import Profile from "@/app/profile/page";
import { Link } from "@radix-ui/themes";

export default function Header() {
  return (
    <header className="header">
      <h1>Profoundly</h1>
      <SignedIn />

      <Profile />
      <nav>
        <Link href="/">Home</Link>
        <Link href="/posts">Posts</Link>
      </nav>
    </header>
  );
}
