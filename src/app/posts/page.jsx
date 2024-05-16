import ProfileForm from "@/components/ProfileForm";
import { db } from "@/lib/db";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { Button } from "@radix-ui/themes";

export default async function Posts() {
  // get the clerk userId
  const { userId } = auth();

  const profileResult = await db.query(
    `SELECT id FROM profiles WHERE clerk_id = '${userId}'`
  );
  const profileId = profileResult.rows[0]?.id;
  const username = profileResult.rows[0]?.username;

  // Get posts of the signed-in user
  const postsResult = await db.query(`
    SELECT
      posts.id,
      posts.content,
      profiles.username
    FROM posts
    INNER JOIN profiles ON posts.profile_id = profiles.id
    WHERE posts.profile_id = ${profileId}
  `);
  const posts = postsResult.rows;
  // get my new posts

  // server action to add a new post
  async function handleAddPost(formData) {
    "use server";

    // add the new post to the database
    await db.query(
      `INSERT INTO posts (profile_id, content) VALUES (${profileId}, '${content}')`
    );
  }

  return (
    <div>
      <h2>Posts</h2>
      <SignedIn>
        {!username ? (
          <div>
            <h3>Create new post</h3>
            <form action={handleAddPost}>
              <textarea name="content" placeholder="New post"></textarea>
              <Button>Submit</Button>
            </form>
          </div>
        ) : (
          <div>
            <h3>Complete your profile to add a post</h3>
            <ProfileForm />
          </div>
        )}
      </SignedIn>

      <SignedOut>
        <p>You need to sign in to add a post</p>
        <SignInButton />
      </SignedOut>

      <h3> Posts</h3>
      <div className="posts">
        {posts.map((post) => {
          return (
            <div key={post.id}>
              <h4>{post.username} says...</h4>
              <p>{post.content}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
