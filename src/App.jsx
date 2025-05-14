import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const res = await axios.get('http://localhost:5000/files');
      setFiles(res.data);
    } catch (err) {
      console.error('Error fetching files', err);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please select a file');

    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('http://localhost:5000/upload', formData);
      setFile(null);
      fetchFiles();
    } catch (err) {
      console.error('Upload failed', err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>File Upload & Download</h1>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit">Upload</button>
      </form>

      <h2>Available Files</h2>
      <ul>
        {files.map((f) => (
          <li key={f.name}>
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
