import ProfileForm from "@/components/ProfileForm";
import { db } from "@/lib/db";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

export default async function Posts() {
  // get the clerk userId
  const { userId } = auth();

  // get my new posts
  const postsResult = await db.query(`SELECT
      posts.id,
      posts.content,
      profiles.username,
      created_at
    FROM posts
    INNER JOIN profiles ON posts.profile_id = profiles.id
    WHERE posts.profile_id = (
      SELECT id FROM profiles WHERE clerk_id = '${userId}'
    )
  `);

  const posts = postsResult.rows;
  console.log(posts);

  // server action to add a new post
  async function handleAddPost(formData) {
    "use server";
    // get information from the form

    const content = formData.get("content");
    const created_at = formData.get("created_at");

    // get the profile id from the database
    const profileResult = await db.query(
      `SELECT id,username FROM profiles WHERE clerk_id = '${userId}'`
    );

    const profileId = profileResult.rows[0]?.id;

    // add the new post to the database
    await db.query(
      `INSERT INTO posts (profile_id, content, created_at) VALUES ($1, $2, $3)`,
      [profileId, content, created_at]
    );

    if (!profileId) {
      notFound();
    }
  }
  return (
    <div>
      <ProfileForm />
      <h2>Posts</h2>
      <SignedIn>
        <h3>Create new post</h3>
        <form action={handleAddPost}>
          <textArea name="content" placeholder="New post"></textArea>
          <button>Submit</button>
        </form>
      </SignedIn>

      <SignedOut>
        <p>You need to sign in to add a post</p>
        <SignInButton />
      </SignedOut>

      <h3>posts</h3>
      <div className="posts">
        {posts.map((post) => {
          return (
            <div key={post.id}>
              <h4>{post.username} from says...</h4>
              <p>{post.content} at</p>
              {/* <p>{post.created_at}</p> */}
              {/* <button action={() => handleDeletePost(post.id)}>Delete</button> */}
            </div>
          );
        })}
      </div>
    </div>
  );
}
