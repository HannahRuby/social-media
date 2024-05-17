import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { Dialog, Flex, Text, TextField, Button } from "@radix-ui/themes";
import { BrokenPage } from "next/navigation";

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

    try {
      await db.query(`UPDATE profiles SET 
        username = '${username}',
        bio = '${bio}',
        country = '${country}',
        industry = '${industry}' 
        WHERE clerk_id = '${userId}'`);

      // Revalidate the page
      revalidatePath("/");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  if (!handleUpdateProfile) {
    BrokenPage();
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
              <TextField
                name="username"
                value={formData.username}
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
  );
}
