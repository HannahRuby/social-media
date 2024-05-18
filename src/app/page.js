"use client";

import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import React from "react";

export default function Home() {
  return (
    <div>
      <p>
        Welcome to Profoundly – Where Connections Transform Careers! Join our
        vibrant community of professionals from diverse industries worldwide.
        Whether you&apos;re seeking career insights, networking opportunities,
        or mentorship, Profoundly is your gateway to meaningful connections and
        professional growth. Connect with like-minded individuals, share
        industry insights, and unlock new opportunities to advance your career.
        Together, let&apos;s build a network that empowers and inspires success.
        Sign up today and take the first step towards a profoundly rewarding
        career journey!
      </p>
      <div className="Container">
        <AspectRatio.Root ratio={16 / 9}>
          <img
            className="Image"
            src="/Home.jpg"
            alt="social media"
            width={300}
            height={500}
          />
        </AspectRatio.Root>
      </div>
    </div>
  );
}
