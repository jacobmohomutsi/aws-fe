import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // LOAD users
  useEffect(() => {
    const loadUsers = async () => {
      const res = await fetch(API_URL);
      const data = await res.json();
      setUsers(data);
    };

    loadUsers();
  }, []);

  // ADD user
  const addUser = async () => {
    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    });

    setName("");
    setEmail("");

    // reload users
    const res = await fetch(API_URL);
    const data = await res.json();
    setUsers(data);
  };

  return (
    <div>
      <h2>Add User</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={addUser}>Add</button>

      <h2>Users</h2>
      {users.map((u) => (
        <div key={u.id}>
          {u.name} - {u.email}
        </div>
      ))}
    </div>
  );
}

export default App;