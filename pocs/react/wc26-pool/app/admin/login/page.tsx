"use client";

import { Button, Card, Center, PasswordInput, Stack, Text, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    initialValues: { email: "", password: "" },
    validate: {
      email: (v) => (!v.includes("@") ? "Valid email required" : null),
      password: (v) => (v.length === 0 ? "Required" : null),
    },
  });

  const handleSubmit = form.onSubmit(async (values) => {
    setError(null);
    const res = await fetch("/api/auth/admin-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const json = await res.json();
    if (!res.ok) {
      setError(json.error?.message ?? "Login failed.");
    } else {
      router.push("/admin/matches");
    }
  });

  return (
    <Center h="100vh">
      <Card w={400} p="xl">
        <Stack gap="md">
          <Title order={2} ta="center">
            Admin Login
          </Title>
          <form onSubmit={handleSubmit}>
            <Stack gap="sm">
              <TextInput
                label="Email"
                type="email"
                placeholder="admin@example.com"
                {...form.getInputProps("email")}
              />
              <PasswordInput label="Password" {...form.getInputProps("password")} />
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
        </Stack>
      </Card>
    </Center>
  );
}
