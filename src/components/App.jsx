import React, { useState, useEffect } from "react";
import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [toys, setToys] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Fetch all toys on page load
  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((res) => res.json())
      .then((data) => setToys(data))
      .catch((err) => console.error("Failed to load toys:", err));
  }, []);

  // Add a new toy (POST)
  function addToy(newToy) {
    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newToy),
    })
      .then((res) => res.json())
      .then((addedToy) => setToys([...toys, addedToy]))
      .catch((err) => console.error("Failed to add toy:", err));
  }

  // Update likes (PATCH)
  function updateLikes(updatedToy) {
    fetch(`http://localhost:3001/toys/${updatedToy.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes: updatedToy.likes }),
    })
      .then((res) => res.json())
      .then((data) => {
        const updatedToys = toys.map((toy) =>
          toy.id === data.id ? data : toy
        );
        setToys(updatedToys);
      })
      .catch((err) => console.error("Failed to update likes:", err));
  }

  // Delete a toy (DELETE)
  function deleteToy(id) {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          setToys(toys.filter((toy) => toy.id !== id));
        }
      })
      .catch((err) => console.error("Failed to delete toy:", err));
  }

  function handleClick() {
    setShowForm((prev) => !prev);
  }

  return (
    <div>
      <Header />
      <button onClick={handleClick}>
        {showForm ? "Hide Form" : "Add a Toy"}
      </button>
      {showForm && <ToyForm onAddToy={addToy} />}
      <ToyContainer toys={toys} onUpdateLikes={updateLikes} onDeleteToy={deleteToy} />
    </div>
  );
}

export default App;