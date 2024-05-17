import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { Button, Dialog } from "@radix-ui/themes";

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
              <TextField.Root
                defaultValue=""
                placeholder="Enter your username"
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Country
              </Text>
              <TextField.Root
                defaultValue=""
                placeholder="Enter your country"
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Industry
              </Text>
              <TextField.Root
                defaultValue=""
                placeholder="Enter your industry"
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Bio
              </Text>
              <TextField.Root defaultValue="" placeholder="Enter your bio" />
            </label>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button>Save</Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}
