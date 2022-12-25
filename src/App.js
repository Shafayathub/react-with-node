import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);
  const handleAddUser = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const profession = event.target.profession.value;
    const user = { name, profession };

    // POST data to the server
    fetch('http://localhost:5000/user', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        const newUsers = [...users, data];
        setUsers(newUsers);
        console.log('Nahin you are the boss', data);
      });
  };
  return (
    <div className="App">
      <h1>My own DATA: {users.length}</h1>
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" placeholder="name"></input>
        <input type="text" name="profession" placeholder="profession"></input>
        <input type="submit" value="Add user" />
      </form>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            Name: {user.name} <br /> Profession:{user.profession}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
