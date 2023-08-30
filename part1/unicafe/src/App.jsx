import { useState } from 'react'
import Header from './Header'
import Button from './Button'
import Statistics from './Statistics'

const App = () => {
  const textFeedback = "give feedback"
  const textStatistics = "statistics"

  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + neutral + bad

  const stats = [
    { text: "good", value: good },
    { text: "neutral", value: neutral },
    { text: "bad", value: bad },
    { text: "all", value: all },
    { text: "average", value: (good - bad) / all },
    { text: "positive", value: good / all }
  ]

  const increase = (setSomething, something) => () => setSomething(something + 1)

  return (
    <div>
      <Header text={textFeedback} />
      <Button handleClick={increase(setGood, good)} text={stats[0].text} />
      <Button handleClick={increase(setNeutral, neutral)} text={stats[1].text} />
      <Button handleClick={increase(setBad, bad)} text={stats[2].text} />
      <Header text={textStatistics} />
      <Statistics stats={stats} />
    </div>
  )
}

export default App
