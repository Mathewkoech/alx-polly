"use client";
import { useParams } from "next/navigation";
import { usePolls } from "@/components/polls/PollsContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import * as React from "react";

export default function PollDetailPage() {
  const { id } = useParams();
  const { polls, vote } = usePolls();
  const poll = polls.find((p) => p.id === id);
  const [selected, setSelected] = React.useState<number | null>(null);
  const [voted, setVoted] = React.useState(false);

  if (!poll) return <div className="text-center mt-16">Poll not found.</div>;

  const handleVote = () => {
    if (selected !== null) {
      vote(poll.id, selected);
      setVoted(true);
    }
  };

  return (
    <Card className="max-w-xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-2">{poll.title}</h2>
      {poll.description && <p className="mb-4 text-muted-foreground">{poll.description}</p>}
      <div className="mb-6">
        <div className="font-medium mb-2">Options:</div>
        {poll.options.map((opt, idx) => (
          <div key={idx} className="flex items-center mb-2">
            <input
              type="radio"
              id={`option-${idx}`}
              name="option"
              disabled={voted}
              checked={selected === idx}
              onChange={() => setSelected(idx)}
              className="mr-2"
            />
            <label htmlFor={`option-${idx}`} className="flex-1 cursor-pointer">
              {opt.text}
            </label>
            <span className="ml-4 text-xs text-muted-foreground">
              {voted ? `${opt.votes} vote${opt.votes !== 1 ? "s" : ""}` : null}
            </span>
          </div>
        ))}
      </div>
      <div className="flex gap-2 justify-end">
        <Button onClick={handleVote} disabled={voted || selected === null} type="button">
          {voted ? "Voted" : "Submit Vote"}
        </Button>
      </div>
    </Card>
  );
}
