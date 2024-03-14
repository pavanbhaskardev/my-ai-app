import { createAI, createStreamableUI } from "ai/rsc";
import { sleep } from "openai/core.mjs";

function Spinner() {
  return <div>Loading...</div>;
}

async function submitUserMessage() {
  "use server";

  const uiStream = createStreamableUI(<Spinner />);

  (async () => {
    await sleep(1000);

    uiStream.update(
      <div className="inline-flex gap-1">Fetching results please wait....</div>
    );
  })();

  return {
    id: Date.now(),
    display: uiStream.value,
  };
}

const initialAIState: {
  role: "user" | "assistant" | "system" | "function";
  content: string;
  id?: string;
  name?: string;
}[] = [];

// The initial UI state that the client will keep track of, which contains the message IDs and their UI nodes.
const initialUIState: {
  id: number;
  display: React.ReactNode;
}[] = [];

// AI is a provider you wrap your application with so you can access AI and UI state in your components.
export const AI = createAI({
  actions: {
    submitUserMessage,
  },
  initialUIState,
  initialAIState,
});
