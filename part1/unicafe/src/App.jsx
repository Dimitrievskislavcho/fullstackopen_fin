import { useState } from "react";

const Button = ({ text, onFeedback }) => (
  <button onClick={onFeedback}>{text}</button>
);

const FEEDBACKS = {
  GOOD: "good",
  NEUTRAL: "neutral",
  BAD: "bad",
};

const Feedback = ({ onFeedback }) => {
  const createFeedbackHandler = (feedback) => () => onFeedback(feedback);
  return (
    <>
      <h2>give feedback</h2>
      <Button
        onFeedback={createFeedbackHandler(FEEDBACKS.GOOD)}
        text={FEEDBACKS.GOOD}
      />
      <Button
        onFeedback={createFeedbackHandler(FEEDBACKS.NEUTRAL)}
        text={FEEDBACKS.NEUTRAL}
      />
      <Button
        onFeedback={createFeedbackHandler(FEEDBACKS.BAD)}
        text={FEEDBACKS.BAD}
      />
    </>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ stats: { good = 0, neutral = 0, bad = 0 } }) => {
  const totalFeedbacks = good + neutral + bad;

  const calculateAverageGrade = () => {
    const totalScore = good + -1 * bad;
    if (0 === totalFeedbacks) return "";
    return totalScore / totalFeedbacks;
  };

  const calculatePositiveFeedbackPercentage = () => {
    const goodFeedback = good;
    const numberOfFeedbacks = good + neutral + bad;
    const positiveInPercentage = (goodFeedback / numberOfFeedbacks) * 100;
    if (0 === numberOfFeedbacks) return "";
    return `${positiveInPercentage} %`;
  };

  return (
    <>
      <h2>statistics</h2>
      {!totalFeedbacks ? (
        "No feedback given"
      ) : (
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={totalFeedbacks} />
            <StatisticLine text="average" value={calculateAverageGrade()} />
            <StatisticLine
              text="positive"
              value={calculatePositiveFeedbackPercentage()}
            />
          </tbody>
        </table>
      )}
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const setFeedback = (feedback) => {
    switch (feedback) {
      case "good":
        setGood(good + 1);
        break;
      case "neutral":
        setNeutral(neutral + 1);
        break;
      case "bad":
        setBad(bad + 1);
        break;
      default:
        throw new Error("incorrect feedback value was used");
    }
  };

  return (
    <>
      <Feedback onFeedback={setFeedback}></Feedback>
      <Statistics stats={{ good, neutral, bad }} />
    </>
  );
};

export default App;
