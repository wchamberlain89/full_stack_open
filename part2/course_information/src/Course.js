import React from 'react';

const Header = ({ title }) => {
  return (
    <h1>{title}</h1>
  )
}
const Content = ({ parts }) => {
  return (
    <>
      {parts.map(part => <Part part={part}/>)}
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
const Total = ({ parts }) => {
  const getTotal = () => {
    return parts.reduce((acc, part) => {
      return acc += part.exercises
    }, 0);
  }

  return (
  <p>Total Number of exercises: {getTotal()}</p>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header title={course.name}/>
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course;