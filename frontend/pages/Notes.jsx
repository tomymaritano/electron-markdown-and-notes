import { useState, useEffect } from "react";
import "../src/styles/notes.css"; // 🔥 Importamos los estilos

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(savedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (!text.trim()) return;
    
    if (editingIndex !== null) {
      const updatedNotes = [...notes];
      updatedNotes[editingIndex] = text;
      setNotes(updatedNotes);
      setEditingIndex(null);
    } else {
      setNotes([...notes, text]);
    }
    
    setText(""); 
  };

  const deleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes([...updatedNotes]);
  };

  const editNote = (index) => {
    setText(notes[index]);
    setEditingIndex(index);
  };

  return (
    <div className="notes-container">
      <h2 className="notes-title">📝 Notas</h2>
      
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Escribe una nota..."
        className="notes-input"
      />
      <button onClick={addNote} className="notes-button">
        {editingIndex !== null ? "Actualizar Nota" : "Agregar Nota"}
      </button>

      <ul className="notes-list">
        {notes.length > 0 ? (
          notes.map((note, index) => (
            <li key={index} className="note-item">
              <span onClick={() => editNote(index)} className="note-text">
                {note}
              </span>
              <button onClick={() => deleteNote(index)} className="delete-button">
                🗑️
              </button>
            </li>
          ))
        ) : (
          <p>No hay notas aún.</p>
        )}
      </ul>
    </div>
  );
}