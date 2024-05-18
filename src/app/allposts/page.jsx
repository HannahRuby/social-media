import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { SignedOut, SignInButton } from "@clerk/nextjs";

export default async function AllPosts() {
  //get the clerk userid
  const { userId } = auth();

  //get the newpost
  const posts = await db.query(`SELECT
posts.id,
posts.content,
profiles.username,
profiles.country,
profiles.industry
FROM posts
INNER JOIN profiles ON posts.profile_id = profiles.id`);

  //server action to add new post

  //   async function handleAddPost(formData) {
  //     "use server";
  //     // get information from the form
  //     const content = formData.get("content");

  //     // get the profile id from the database
  //     const result = await db.query(
  //       `SELECT id FROM profiles WHERE clerk_id = '${userId}'`
  //     );
  //     const profileId = result.rows[0].id;

  //     // add the new post to the database
  //     await db.query(
  //       `INSERT INTO posts (profile_id, content) VALUES (${profileId}, '${content}')`
  //     );

  return (
    <div>
      <h3>All posts</h3>
      <SignedOut>
        <p>Please sign -in to make ypur own post</p>
        <SignInButton />
      </SignedOut>
      <div className="posts">
        {posts.rows.map((post) => {
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
