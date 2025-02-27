import {Card, ScrollArea, Text, TextInput} from "@mantine/core";
import {IconTerminal2} from "@tabler/icons-react";
import axios from "axios";
import {useOptimistic, useRef, useState, useTransition} from "react";

export default function Terminal() {
  const [history, setHistory] = useState([]);
  const [isPending, startTransition] = useTransition();
  const [optimisticHistory, setOptimisticHistory] = useOptimistic(history);

  const handleCommand = async (cmd) => {
    if (!cmd.trim()) return;
    setOptimisticHistory((prev) => [...prev, `$ ${cmd}`]);

    try {
      const response = await axios.post("http://localhost:3000/execute", {command: cmd});

      startTransition(() => {
        setHistory((prev) => [...prev, `$ ${cmd}`, response.data.output]);
      });
    } catch (error) {
      setHistory((prev) => [...prev, `$ ${cmd}`, "Error executing command"]);
    }
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder align="center" style={{width: "100%", background: "#f5f5f5"}}>
      <Text size="lg" weight={500} mb="sm" style={{display: "flex", gap: 10, justifyContent: "center", alignItems: "center"}}>
        Linux Terminal <IconTerminal2 size={20}/>
      </Text>
      <ScrollArea style={{textAlign: "left", height: 300}}>
        {optimisticHistory.map((line, i) => (
          <Text key={i} size="sm">{line}</Text>
        ))}
        {isPending && "..."}
      </ScrollArea>
      <TextInput
        placeholder="$ Enter command..."
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleCommand(e.target.value);
            e.target.value = "";
          }
        }}
      />
    </Card>
  );
}
