// src/App.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

function App() {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const res = await axios.get(`${API_BASE}/files`);
      setFiles(res.data);
    } catch (err) {
      console.error("Error fetching files:", err);
    }
  };

  const uploadFile = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please choose a file first.");

    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post(`${API_BASE}/upload`, formData);
      setFile(null);
      fetchFiles();
    } catch (err) {
      console.error("Error uploading file:", err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>File Upload & Download</h1>

      <form onSubmit={uploadFile}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit" style={{ marginLeft: '10px' }}>Upload</button>
      </form>

      <h2 style={{ marginTop: '20px' }}>Available Files</h2>
      <ul>
        {files.map((f) => (
          <li key={f.name} style={{ marginBottom: '10px' }}>
            {f.name}{' '}
            <a href={f.url} download>
              <button>Download</button>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
