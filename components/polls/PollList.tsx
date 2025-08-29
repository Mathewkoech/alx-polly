"use client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePolls } from "@/components/polls/PollsContext";
import { useRouter } from "next/navigation";

export default function PollList() {
  const { polls } = usePolls();
  const router = useRouter();

  if (polls.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-16 gap-4">
        <div className="text-lg text-muted-foreground">No polls yet.</div>
        <Button onClick={() => router.push('/polls/new')}>Create your first poll</Button>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {polls.map((poll) => (
        <Card key={poll.id} className="flex flex-col justify-between p-6 h-48">
          <div>
            <h2 className="text-lg font-semibold mb-2">{poll.title}</h2>
            <p className="text-sm text-muted-foreground mb-4">{poll.description}</p>
          </div>
          <div className="flex items-center justify-between mt-auto">
            <span className="text-xs text-muted-foreground">{poll.createdBy ? `Created by ${poll.createdBy}` : null}</span>
            <Button onClick={() => router.push("/polls/" + poll.id)}>View</Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
