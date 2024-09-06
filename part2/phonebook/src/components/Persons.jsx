const Person = ({ name, number, onDelete }) => (
  <div key={name}>
    {name} {number}
    <button onClick={() => onDelete()}>delete</button>
  </div>
);

const Persons = ({ data, onDelete }) => {
  return (
    <>
      {data.map(({ name, number, id }) => (
        <Person
          onDelete={() => onDelete(id)}
          key={id}
          name={name}
          number={number}
        />
      ))}
    </>
  );
};

export default Persons;
