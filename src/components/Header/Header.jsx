// import Link from "next/link";
import { SignedIn } from "@clerk/nextjs";
import Profile from "@/app/profile/page";
import { Link } from "@radix-ui/themes";
import { HomeIcon } from "@radix-ui/react-icons";

export default function Header() {
  return (
    <header className="header">
      <h1 className="logo">Profoundly</h1>
      <SignedIn />
      <Profile />
      <nav className="nav-links">
        <Link className="nav-link" href="/">
          <HomeIcon />
          <span>Home</span>
        </Link>
        <Link className="nav-link" href="/posts">
          Posts
        </Link>
        <Link className="nav-link" href="/allposts">
          All-Posts
        </Link>
      </nav>
    </header>
  );
}
