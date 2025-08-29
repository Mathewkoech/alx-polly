"use client";
import React, { createContext, useContext, useState } from "react";

export interface PollOption {
  text: string;
  votes: number;
}

export interface Poll {
  id: string;
  title: string;
  description?: string;
  options: PollOption[];
  createdBy?: string;
}

interface PollsContextType {
  polls: Poll[];
  addPoll: (poll: Omit<Poll, "id">) => void;
  vote: (pollId: string, optionIdx: number) => void;
}

const PollsContext = createContext<PollsContextType | undefined>(undefined);

export function usePolls() {
  const ctx = useContext(PollsContext);
  if (!ctx) throw new Error("usePolls must be used within a PollsProvider");
  return ctx;
}

export const PollsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [polls, setPolls] = useState<Poll[]>([]);

  const addPoll = (poll: Omit<Poll, "id">) => {
    setPolls((prev) => [
      ...prev,
      { ...poll, id: Math.random().toString(36).slice(2, 9) },
    ]);
  };

  const vote = (pollId: string, optionIdx: number) => {
    setPolls((prev) =>
      prev.map((poll) =>
        poll.id === pollId
          ? {
              ...poll,
              options: poll.options.map((opt, idx) =>
                idx === optionIdx ? { ...opt, votes: opt.votes + 1 } : opt
              ),
            }
          : poll
      )
    );
  };

  return (
    <PollsContext.Provider value={{ polls, addPoll, vote }}>
      {children}
    </PollsContext.Provider>
  );
};
