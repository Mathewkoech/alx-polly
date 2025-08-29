"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import * as React from "react";
import { usePolls } from "./PollsContext";
import { useRouter } from "next/navigation";

export default function PollCreateForm() {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [options, setOptions] = React.useState(["", ""]);
  const { addPoll } = usePolls();
  const router = useRouter();

  const handleOptionChange = (idx: number, value: string) => {
    setOptions((prev) => prev.map((opt, i) => (i === idx ? value : opt)));
  };

  const addOption = () => {
    setOptions((prev) => [...prev, ""]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || options.filter((o) => o.trim()).length < 2) return;
    addPoll({
      title,
      description,
      options: options.filter((o) => o.trim()).map((text) => ({ text, votes: 0 })),
      createdBy: "Anonymous",
    });
    router.push("/polls");
  };

  return (
    <Card className="max-w-xl mx-auto p-8">
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div>
          <h2 className="text-xl font-semibold mb-1">Poll Information</h2>
          <p className="text-sm text-muted-foreground mb-4">Fill out the details for your new poll.</p>
          <label className="block mb-2 text-sm font-medium">Poll Title</label>
          <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter poll title" className="mb-4" />
          <label className="block mb-2 text-sm font-medium">Description (Optional)</label>
          <Input value={description} onChange={e => setDescription(e.target.value)} placeholder="Provide a description about your poll" className="mb-4" />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">Poll Options</label>
          {options.map((option, idx) => (
            <Input
              key={idx}
              placeholder={`Option ${idx + 1}`}
              value={option}
              onChange={(e) => handleOptionChange(idx, e.target.value)}
              className="mb-2"
            />
          ))}
          <Button type="button" variant="outline" size="sm" onClick={addOption} className="mt-1 mb-4">Add Option</Button>
        </div>
        <div className="flex gap-2 justify-end">
          <Button type="submit">Create Poll</Button>
        </div>
      </form>
    </Card>
  );
}
