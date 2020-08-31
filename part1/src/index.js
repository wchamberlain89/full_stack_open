import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({ course }) => {
  return (
    <h1>{course}</h1>
  )
}
const Content = ({ part1, part2, part3 }) => {
  return (
    <>
      <Part 
        part={part1}
      />
      <Part 
        part={part2}
      />
      <Part 
        part={part3}
      />
    </>
  )
}

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}
const Total = ({ exercises }) => {
  const getTotal = (exercises) => {
    console.log(exercises);
    let total = 0; 
    exercises.forEach(exercise => {
      total += exercise;
    });
    return total;
  }
  return (
  <p>Number of exercises {getTotal(exercises)}</p>
  )
}

const App = () => {
    const course = 'Half Stack application development'
    const part1 = {
      name: 'Fundamentals of React',
      exercises: 10
    }
    const part2 = {
      name: 'Using props to pass data',
      exercises: 7
    }
    const part3 = {
      name: 'State of a component',
      exercises: 14
    }

  return (
    <div>
      <Header course={course}/>
      
      <Content 
        part1={part1} 
        part2={part2} 
        part3={part3} 
      />
      <Total exercises={[part1.exercises, part2.exercises, part3.exercises]} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))