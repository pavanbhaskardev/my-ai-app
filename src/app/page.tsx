"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUIState, useActions } from "ai/rsc";

export default function Home() {
  const [messages, setMessages] = useUIState();
  const { submitUserMessage } = useActions();

  console.log({ messages });

  const handleStreaming = async () => {
    try {
      const messages = await submitUserMessage();
      setMessages((currentMessages) => [...currentMessages, messages]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative h-screen">
      <div className="flex gap-2 max-w-lg">
        <Input placeholder="Type anything..." />
        <Button onClick={handleStreaming}>Submit</Button>
      </div>

      {
        // View messages in UI state
        messages.length
          ? messages.map((message) => (
              <div key={message.id}>{message.display}</div>
            ))
          : null
      }
    </div>
  );
}
