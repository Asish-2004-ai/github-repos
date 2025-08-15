"use client";

import { useState } from "react";

export default function Home() {
  const [username, setUsername] = useState("");
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState("");

  const fetchRepos = async () => {
    if (!username) {
      setError("Please enter a username");
      return;
    }
    setError("");
    setLoading(true);
    setRepos([]);

    try {
      const res = await fetch(`/api/repos?username=${username}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Error fetching");
      } else {
        setRepos(data);
      }
    } catch (err) {
      setError("Error");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>GitHub Repositories</h1>
      <input
        type="text"
        placeholder="Enter GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ padding: "0.5rem", marginRight: "0.5rem" }}
      />
      <button onClick={fetchRepos} style={{ padding: "0.5rem" }}>
        Search
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              {repo.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
