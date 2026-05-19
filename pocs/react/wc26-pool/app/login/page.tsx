"use client";

import { Anchor, Button, Card, Center, PasswordInput, Stack, Text, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    initialValues: { inviteCode: "", firstName: "", lastName: "" },
    validate: {
      inviteCode: (v) => (v.trim().length === 0 ? "Required" : null),
      firstName: (v) => (v.trim().length === 0 ? "Required" : null),
      lastName: (v) => (v.trim().length === 0 ? "Required" : null),
    },
  });

  const handleSubmit = form.onSubmit(async (values) => {
    setError(null);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const json = await res.json();
    if (!res.ok) {
      setError(json.error?.message ?? "Login failed.");
    } else {
      router.push("/matches");
    }
  });

  return (
    <Center h="100vh">
      <Card w={400} p="xl">
        <Stack gap="md">
          <Title order={2} ta="center">
            Join the Pool
          </Title>
          <Text c="dimmed" size="sm" ta="center">
            Enter the invite code and your name to sign in.
          </Text>
          <form onSubmit={handleSubmit}>
            <Stack gap="sm">
              <PasswordInput
                label="Invite code"
                placeholder="wc26-..."
                {...form.getInputProps("inviteCode")}
              />
              <TextInput
                label="First name"
                placeholder="Gabriel"
                {...form.getInputProps("firstName")}
              />
              <TextInput
                label="Last name"
                placeholder="Silva"
                {...form.getInputProps("lastName")}
              />
              {error && (
                <Text c="red" size="sm">
                  {error}
                </Text>
              )}
              <Button type="submit" loading={form.submitting} fullWidth mt="xs">
                Sign in
              </Button>
            </Stack>
          </form>
          <Text size="xs" c="dimmed" ta="center">
            Admin?{" "}
            <Anchor component={Link} href="/admin/login" size="xs">
              Admin login
            </Anchor>
          </Text>
        </Stack>
      </Card>
    </Center>
  );
}
