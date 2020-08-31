import React, { useState } from 'react'
import ReactDOM from 'react-dom'
const Statistic = ({ title, value }) => <h5>{title} {value}</h5>
const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const findTotal = () => {
    return good + neutral + bad;
  }

  const findAverage = () => {
    return good - bad / findTotal();
  }

  const findPositive = () => {
    return good / findTotal();
  }

  return (
    <>
      <h2>Give FeedBack</h2>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>

      <Statistic title={"Good"} value={good} />
      <Statistic title={"Neutral"} value={neutral} />
      <Statistic title={"Bad"} value={bad} />
      <Statistic title={"Total Votes"} value={findTotal()} />
      <Statistic title={"Average"} value={findAverage() || 0} />
      <Statistic title={"Positive"} value={findPositive() || 0} />

    </>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
