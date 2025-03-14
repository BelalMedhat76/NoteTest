import React, { useState, useEffect, useRef } from "react";
import "./App.css";

const App = () => {
  const [notes, setNotes] = useState([]);
  const inputRef = useRef(null);

  // ✅ تحميل الملاحظات من localStorage عند بدء التطبيق
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(savedNotes);
  }, []);

  // ✅ حفظ الملاحظات في localStorage عند أي تغيير
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    const newNote = inputRef.current.value.trim();
    if (newNote === "") return;

    setNotes([...notes, newNote]);
    inputRef.current.value = ""; // مسح الإدخال
    inputRef.current.focus(); // ✅ جعل الإدخال يحصل على التركيز
  };

  const deleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  return (
    <div className="container">
      <h1>📒 Notes Manager</h1>
      <div className="input-container">
        <input ref={inputRef} type="text" placeholder="Enter your note..." />
        <button onClick={addNote}>Add Note</button>
      </div>
      <ul className="notes-list">
        {notes.map((note, index) => (
          <li key={index} className="note-item">
            {note}
            <button onClick={() => deleteNote(index)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
