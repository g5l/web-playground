export async function loginAction(_: string | null, formData: FormData) {
  await new Promise((r) => setTimeout(r, 1000));

  const username = formData.get("username");
  const password = formData.get("password");

  if (username === "admin" && password === "123") {
    return "Login successful!";
  }
  return "Invalid credentials!";
}
