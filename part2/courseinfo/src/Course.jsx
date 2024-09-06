const Header = ({ course }) => {
  return <h2>{course}</h2>;
};

const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
);

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(({ name, exercises, id }) => (
        <Part key={id} name={name} exercises={exercises} />
      ))}
    </div>
  );
};

// eslint-disable-next-line no-unused-vars
const Total = ({ parts }) => {
  const totalNumOfExercises = parts.reduce(
    (totalExercises, { exercises }) => totalExercises + exercises,
    0
  );
  return (
    <p style={{ fontWeight: 700 }}>total of {totalNumOfExercises} exercises</p>
  );
};

const Course = ({ course: { name, parts } }) => {
  return (
    <div>
      <Header course={name}></Header>
      <Content parts={parts}></Content>
      <Total parts={parts}></Total>
    </div>
  );
};

export default Course;
