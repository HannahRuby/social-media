import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { Dialog, Flex, Text, TextField, Button } from "@radix-ui/themes";
import { NotFound, error } from "next/navigation";

export default function ProfileForm() {
  const { userId } = auth();
  const initialFormData = {
    username: "",
    bio: "",
    country: "",
    industry: "",
  };
  const formData = initialFormData;

  async function handleUpdateProfile() {
    const { username, bio, country, industry } = formData;

    await db.query(`UPDATE profiles SET 
        username = '${username}',
        bio = '${bio}',
        country = '${country}',
        industry = '${industry}' 
        WHERE clerk_id = '${userId}'`);

    await db.query(
      `UPDATE profiles SET username = '${username}' WHERE clerk_id = '${userId}'`
    );
    revalidatePath("/");
  }

  return (
    <>
      {userId ? (
        <div>
          <Dialog.Root>
            <Dialog.Trigger>
              <Button>Update profile</Button>
            </Dialog.Trigger>

            <Dialog.Content maxWidth="450px">
              <Dialog.Title>Update profile</Dialog.Title>
              <Dialog.Description size="2" mb="4">
                Welcome to Profoundly, please update your details!.
              </Dialog.Description>

              <Flex direction="column" gap="3">
                <label>
                  <Text as="div" size="2" mb="1" weight="bold">
                    Username
                  </Text>
                  <TextField
                    name="username"
                    value={formData.username}
                    onChange={handleUpdateProfile}
                    placeholder="Enter your username"
                  />
                </label>
                <label>
                  <Text as="div" size="2" mb="1" weight="bold">
                    Country
                  </Text>
                  <TextField
                    name="country"
                    value={formData.country}
                    onChange={handleUpdateProfile}
                    placeholder="Enter your country"
                  />
                </label>
                <label>
                  <Text as="div" size="2" mb="1" weight="bold">
                    Industry
                  </Text>
                  <TextField
                    name="industry"
                    value={formData.industry}
                    onChange={handleUpdateProfile}
                    placeholder="Enter your industry"
                  />
                </label>
                <label>
                  <Text as="div" size="2" mb="1" weight="bold">
                    Bio
                  </Text>
                  <TextField
                    name="bio"
                    value={formData.bio}
                    onChange={handleUpdateProfile}
                    placeholder="Enter your bio"
                  />
                </label>
              </Flex>

              <Flex gap="3" mt="4" justify="end">
                <Dialog.Close>
                  <Button variant="soft" color="gray">
                    Cancel
                  </Button>
                </Dialog.Close>
                <Dialog.Close>
                  <Button onClick={handleUpdateProfile}>Save</Button>
                </Dialog.Close>
              </Flex>
            </Dialog.Content>
          </Dialog.Root>
        </div>
      ) : (
        (NotFound, error())
      )}{" "}
    </>
  );
}
