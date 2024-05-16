import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { Button } from "@radix-ui/themes";

export default function ProfileForm() {
  const { userId } = auth();
  async function handleUpdateProfile(formData) {
    "use server";
    const username = formData.get("username");
    const bio = formData.get("bio");
    const country = formData.get("country");
    const industry = formData.get("industry");

    await db.query(`UPDATE profiles SET 
          username = '${username}',
          bio = '${bio}',
          country = '${country}' 
          industry = '${industry}' 
          WHERE clerk_id = '${userId}'`);
    revalidatePath("/");
  }

  return (
    <div>
      <h2>Update Profile</h2>
      <p>Welcome to Profoundly, please update your details!</p>
      <form action={handleUpdateProfile}>
        <input name="username" placeholder="Username" />
        <input name="country" placeholder="Country" />
        <input name="industry" placeholder="Industry" />
        <input name="bio" placeholder="Bio" />
        <Button>Submit</Button>
      </form>
    </div>
  );
}
