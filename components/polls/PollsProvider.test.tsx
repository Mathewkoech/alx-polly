import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { PollsProvider, usePolls } from './PollsContext';
import '@testing-library/jest-dom';

// Test component to use the context
const TestComponent = () => {
  const { polls, addPoll, vote } = usePolls();

  return (
    <div>
      <button onClick={() => addPoll({ title: 'New Poll', options: [{ text: 'Option 1', votes: 0 }] })}>
        Add Poll
      </button>
      <button onClick={() => vote(polls[0]?.id, 0)}>Vote</button>
      <div data-testid="poll-title">{polls[0]?.title}</div>
      <div data-testid="poll-votes">{polls[0]?.options[0]?.votes}</div>
    </div>
  );
};

// Unit Test: Add Poll
it('should add a new poll', () => {
  render(
    <PollsProvider>
      <TestComponent />
    </PollsProvider>
  );

  const addButton = screen.getByText('Add Poll');
  
  act(() => {
    addButton.click();
  });

  expect(screen.getByTestId('poll-title')).toHaveTextContent('New Poll');
});

// Unit Test: Vote
it('should increment vote count', () => {
  render(
    <PollsProvider>
      <TestComponent />
    </PollsProvider>
  );

  const addButton = screen.getByText('Add Poll');
  
  act(() => {
    addButton.click();
  });

  const voteButton = screen.getByText('Vote');
  
  act(() => {
    voteButton.click();
  });

  expect(screen.getByTestId('poll-votes')).toHaveTextContent('1');
});

// Integration Test: Full Poll Lifecycle
it('should handle full poll lifecycle', () => {
  render(
    <PollsProvider>
      <TestComponent />
    </PollsProvider>
  );

  const addButton = screen.getByText('Add Poll');
  
  act(() => {
    addButton.click();
  });

  expect(screen.getByTestId('poll-title')).toHaveTextContent('New Poll');

  const voteButton = screen.getByText('Vote');
  
  act(() => {
    voteButton.click();
  });

  expect(screen.getByTestId('poll-votes')).toHaveTextContent('1');
});
