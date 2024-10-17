import React, { useState } from 'react';
import Statistics from '../components/Statistics';
import FeedbackOptions from '../components/FeedbackOptions';
import Section from '../components/Section';
import Notification from '../components/Notification';

function App() {
  const [state, setState] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });
  function countTotalFeedback({ good, neutral, bad }) {
    return good + neutral + bad;
  }

  function countPositiveFeedbackPercentage({ good, neutral, bad }) {
    const total = countTotalFeedback({ good, neutral, bad });
    return total ? Math.round((good / total) * 100) : 0;
  }
  const totalFeedback = countTotalFeedback(state);
  const positivePercentage = countPositiveFeedbackPercentage(state);

  const handleFeedback = type => {
    setState(prevState => ({
      ...prevState,
      [type]: prevState[type] + 1,
    }));
  };
  return (
    <div>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={['good', 'neutral', 'bad']}
          onLeaveFeedback={handleFeedback}
        />
      </Section>

      <Section title="Statistics">
        {totalFeedback > 0 ? (
          <Statistics
            good={state.good}
            neutral={state.neutral}
            bad={state.bad}
            total={totalFeedback}
            positivePercentage={positivePercentage}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </div>
  );
}

export default App;
