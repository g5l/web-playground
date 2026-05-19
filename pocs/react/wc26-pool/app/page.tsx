import { Badge, Button, Card, Center, Group, Stack, Text, Title } from "@mantine/core";
import { IconBallFootball, IconTrophy } from "@tabler/icons-react";

export default function Home() {
  return (
    <Center h="100vh">
      <Card w={360} p="xl">
        <Stack gap="md" align="center">
          <Group gap="xs">
            <IconBallFootball size={32} color="var(--mantine-color-accent-5)" />
            <Title order={2}>WC26 Pool</Title>
          </Group>
          <Text c="dimmed" size="sm" ta="center">
            World Cup 2026 sweepstakes, dark mode check
          </Text>
          <Group gap="xs">
            <Badge color="accent" variant="filled">
              Group ×1
            </Badge>
            <Badge color="gold" variant="filled">
              Final ×5
            </Badge>
            <Badge color="danger" variant="filled">
              Locked
            </Badge>
          </Group>
          <Button
            leftSection={<IconTrophy size={16} />}
            variant="filled"
            color="accent"
            fullWidth
          >
            View Leaderboard
          </Button>
        </Stack>
      </Card>
    </Center>
  );
}
