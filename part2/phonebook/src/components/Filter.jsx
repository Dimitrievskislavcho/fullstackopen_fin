const Filter = ({ term, onTermChange }) => {
  return (
    <div>
      filter shown with{" "}
      <input
        type="text"
        value={term}
        onChange={(event) => onTermChange(event.target.value)}
      />
    </div>
  );
};

export default Filter;
