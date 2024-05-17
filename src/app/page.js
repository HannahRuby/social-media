import Image from "next/image";
import AllPost from "./allpost/page";

export default function Home() {
  return (
    <div>
      <p>
        Welcome to Profoundly – Where Connections Transform Careers! Join our
        vibrant community of professionals from diverse industries worldwide.
        Whether you&aposre seeking career insights, networking opportunities, or
        mentorship, Profoundly is your gateway to meaningful connections and
        professional growth. Connect with like-minded individuals, share
        industry insights, and unlock new opportunities to advance your career.
        Together, let&aposs build a network that empowers and inspires success.
        Sign up today and take the first step towards a profoundly rewarding
        career journey!
      </p>

      <Image src="/Home.jpg" alt="social media" width={300} height={500} />

      <AllPost />
    </div>
  );
}
