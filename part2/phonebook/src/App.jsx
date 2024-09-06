import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personsService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [nameSearchTerm, setNameSearchTerm] = useState("");
  const [notification, setNotification] = useState(null);
  const displayedPersons = persons.filter(
    ({ name }) => name.toLowerCase().indexOf(nameSearchTerm.trim()) !== -1
  );
  const showNotification = ({ type, message }) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const updatePersonNumber = (personForUpdate) => {
    personsService
      .updatePerson(personForUpdate.id, { ...personForUpdate, number })
      .then(({ data }) => {
        setPersons(
          persons.map((person) =>
            person.id === personForUpdate.id ? data : person
          )
        );
      })
      .catch(() => {
        showNotification({
          type: "error",
          message: `Informatioon of ${personForUpdate.name} has already beem removed from server`,
        });
      });
  };

  const handleAdditionToPhonebook = (event) => {
    const existingPerson = persons.find(({ name }) => name === newName);

    event.preventDefault();

    if (existingPerson) {
      const shouldReplaceNumber = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );

      if (shouldReplaceNumber) {
        updatePersonNumber(existingPerson);
      }
      return;
    }

    personsService.createPerson({ name: newName, number }).then(({ data }) => {
      setPersons([...persons, data]);
      showNotification({ type: "success", message: `Added ${data.name}` });
    });

    setNewName("");
    setNumber("");
  };

  const deletePerson = (personId) => {
    const personToBeDeleted = persons.find((person) => person.id === personId);
    const shouldDelete = window.confirm(`Delete ${personToBeDeleted.name} ?`);

    if (shouldDelete) {
      personsService.deletePerson(personId).then(() => {
        setPersons(persons.filter((person) => person.id !== personId));
      });
    }
  };

  useEffect(() => {
    personsService.getPersons().then(({ data }) => setPersons(data));
  }, []);
  return (
    <div>
      <h2>Phonebook</h2>
      {notification && <Notification {...notification} />}
      <Filter term={nameSearchTerm} onTermChange={setNameSearchTerm} />
      <h2>add a new</h2>
      <PersonForm
        onSubmit={handleAdditionToPhonebook}
        newName={newName}
        onNewNameChange={setNewName}
        number={number}
        onNumberChange={setNumber}
      />
      <h2>Numbers</h2>
      <Persons
        data={displayedPersons}
        onDelete={(personId) => deletePerson(personId)}
      />
    </div>
  );
};

export default App;
