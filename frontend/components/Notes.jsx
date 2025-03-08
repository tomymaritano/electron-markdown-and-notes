import { useState, useEffect } from "react";
import { useNotes } from "../hooks/useNotes";
import "../styles/notes.css"; // 🔥 Importamos los estilos

export default function Notes() {
  const { notes, setNotes } = useNotes();
  const [text, setText] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [search, setSearch] = useState("");

  // Cargar notas desde localStorage al iniciar
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    if (Array.isArray(savedNotes)) {
      setNotes(savedNotes);
    }
  }, []);

  // Guardar notas en localStorage cuando cambian
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  }, [notes]);

  const addNote = () => {
    if (!text.trim()) return;

    if (editingIndex !== null) {
      // Actualizar texto de la nota sin modificar su estado de completado
      const updatedNotes = [...notes];
      updatedNotes[editingIndex].text = text;
      setNotes(updatedNotes);
      setEditingIndex(null);
    } else {
      // Agregar nueva nota con estado "no completado"
      setNotes([...notes, { text, completed: false }]);
    }

    setText("");
  };

  const deleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes)); // 🔥 Guardar en localStorage
  };

  const startEditing = (index) => {
    setText(notes[index].text);
    setEditingIndex(index);
  };

  const toggleCompletion = (index) => {
    const updatedNotes = [...notes];
    updatedNotes[index].completed = !updatedNotes[index].completed;
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes)); // 🔥 Guardar en localStorage
  };

  return (
    <div className="notes-container">
      <h2 className="notes-title">📝 Notas</h2>

      <input
        type="text"
        placeholder="Buscar notas..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="notes-input"
      />

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Escribe una nota..."
        className="notes-input"
      />

      <button onClick={addNote} className="notes-button">
        {editingIndex !== null ? "Guardar Nota" : "Agregar Nota"}
      </button>

      <ul className="notes-list">
        {notes.length > 0 ? (
          notes
            .filter((note) => note.text.toLowerCase().includes(search.toLowerCase()))
            .map((note, index) => (
              <li key={index} className={`note-item ${note.completed ? "completed" : ""}`}>
                <span onClick={() => toggleCompletion(index)} className="note-text">
                  {note.text}
                </span>
                <div className="note-actions">
                  <button onClick={() => startEditing(index)} className="edit-button">✏️</button>
                  <button onClick={() => deleteNote(index)} className="delete-button">🗑️</button>
                </div>
              </li>
            ))
        ) : (
          <p>No hay notas aún.</p>
        )}
      </ul>
    </div>
  );
}