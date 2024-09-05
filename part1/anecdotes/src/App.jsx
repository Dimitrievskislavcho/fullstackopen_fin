import { useState } from "react";

const AnecdoteSection = ({ title, anecdote, votes }) => {
  return (
    <>
      <h2>{title}</h2>
      <div style={{ height: "70px" }}>{anecdote}</div>
      <div style={{ paddingBottom: 10 }}>
        has {votes} {votes === 1 ? "vote" : "votes"}
      </div>
    </>
  );
};

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(
    anecdotes.reduce((points, _, index) => {
      return { ...points, [index]: 0 };
    }, {})
  );
  const mostVotedAnecdote = Object.entries(votes).reduce(
    (topAnecdoteIndex, [anecdote, anecdoteVotes]) =>
      anecdoteVotes > votes[topAnecdoteIndex] ? anecdote : topAnecdoteIndex,
    0
  );

  const getNextAnecdoteIndex = () => {
    const nextAnecdoteIndex = Math.round(
      Math.random() * (anecdotes.length - 1)
    );
    return nextAnecdoteIndex !== selected
      ? nextAnecdoteIndex
      : getNextAnecdoteIndex();
  };

  const doVote = () => {
    setVotes({ ...votes, [selected]: votes[selected] + 1 });
  };

  const getNextRandomAnecdote = () => {
    setSelected(getNextAnecdoteIndex());
  };

  return (
    <>
      <AnecdoteSection
        title="Anecdote of the day"
        anecdote={anecdotes[selected]}
        votes={votes[selected]}
      />
      <Button text="vote" onClick={doVote} />
      <Button text="next anecdote" onClick={getNextRandomAnecdote} />
      <AnecdoteSection
        title="Anecdote with most votes"
        anecdote={anecdotes[mostVotedAnecdote]}
        votes={votes[mostVotedAnecdote]}
      />
    </>
  );
};

export default App;
