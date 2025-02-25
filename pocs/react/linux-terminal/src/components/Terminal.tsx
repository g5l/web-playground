import { useState, useRef, useOptimistic, useTransition } from "react";
import { Card, Text, TextInput, ScrollArea } from "@mantine/core";
import { IconTerminal2 } from "@tabler/icons-react";

export default function Terminal() {
  const [history, setHistory] = useState([]);
  const [currentDir, setCurrentDir] = useState("~");
  const inputRef = useRef(null);
  const [isPending, startTransition] = useTransition();
  const [optimisticHistory, setOptimisticHistory] = useOptimistic(history);

  const commands = {
    ls: () => "README.md  src  package.json",
    mkdir: (dir) => `Created directory: ${dir}`,
    touch: (file) => `Created file: ${file}`,
    echo: (text) => text,
    cd: (dir) => {
      setCurrentDir(dir);
      return `Changed directory to ${dir}`;
    },
    cat: () => "Sample file content...",
  };

  const handleCommand = (cmd) => {
    const [command, ...args] = cmd.split(" ");

    if (command in commands) {
      const output = commands[command](args.join(" "));

      setOptimisticHistory((prev) => [...prev, `$ ${cmd}`, output]);

      startTransition(() => {
        setHistory((prev) => [...prev, `$ ${cmd}`, output]);
      });
    } else {
      setHistory((prev) => [...prev, `$ ${cmd}`, "Command not found"]);
    }
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Text size="lg" weight={500} mb="sm">Linux Terminal <IconTerminal2 size={20} /></Text>
      <ScrollArea style={{ height: 300 }}>
        {optimisticHistory.map((line, i) => (
          <Text key={i} size="sm">{line}</Text>
        ))}
      </ScrollArea>
      <TextInput
        placeholder="Enter command..."
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleCommand(e.target.value);
            e.target.value = "";
          }
        }}
        ref={inputRef}
      />
    </Card>
  );
}
