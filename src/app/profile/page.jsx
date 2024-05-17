import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { Box, Text, Flex, Card } from "@radix-ui/themes";

export default async function Profile() {
  // Get the userId from auth() -- if null, the user is not signed in
  const { userId } = auth();

  if (userId) {
    // Query DB for user specific information or display assets only to signed in users
    console.log("The userId is set");
  }

  // Get the Backend API User object when you need access to the user's information
  const user = await currentUser();
  console.log("user", user);

  return (
    <div>
      <SignedIn>
        <Box maxWidth="240px">
          <Card>
            <Flex gap="3" align="center">
              <Box>
                <UserButton />
                <Text as="div" size="2" weight="bold">
                  Welcome {user?.username}({user?.industry})
                </Text>
                <Text as="div" size="2" color="gray">
                  You are signed in with {user?.emailAddresses[0].emailAddress}{" "}
                  from
                  {user?.country}
                </Text>
              </Box>
            </Flex>
          </Card>
        </Box>
      </SignedIn>
      <SignedOut>
        <Link href="/sign-in">Please sign in</Link>
        <br />
        <Link href="/sign-up">or sign up</Link>
      </SignedOut>
    </div>
  );
}
