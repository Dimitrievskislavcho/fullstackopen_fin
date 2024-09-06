const FormControl = ({ label, value, onChange }) => {
  return (
    <div>
      {label}:{" "}
      <input
        required={true}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
};

const PersonForm = ({
  onSubmit,
  newName,
  onNewNameChange,
  number,
  onNumberChange,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <FormControl label="name" value={newName} onChange={onNewNameChange} />
      <FormControl label="number" value={number} onChange={onNumberChange} />
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
