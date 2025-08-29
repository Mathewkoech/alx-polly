import PollCreateForm from "@/components/polls/PollCreateForm";

export default function NewPollPage() {
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Create New Poll</h1>
      <PollCreateForm />
    </div>
  );
}
