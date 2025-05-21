import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OPENAI_API_KEY = ''; // Replace with your real OpenAI API key

const MainHomepage = () => {
  const [query, setQuery] = useState('');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setJobs([]);
    try {
      const prompt = `List 5 current IT job openings for "${query}". For each job, provide: job title, company, location, and required skills. Format as a JSON array: [{"title":"...","company":"...","location":"...","skills":["..."]}]`;

      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'user', content: prompt }
          ],
          temperature: 0.7,
          max_tokens: 500,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
        }
      );

      const text = response.data.choices[0].message.content;
      const jobsList = JSON.parse(text);
      setJobs(jobsList);
    } catch (err) {
      setError('Failed to fetch jobs from OpenAI.');
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 800, margin: "2rem auto", padding: "2rem", background: "#fff", borderRadius: 8 }}>
      {/* Top bar with AI button on the right */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <button
          style={{
            padding: '0.5rem 1.5rem',
            fontSize: '1rem',
            borderRadius: '5px',
            border: 'none',
            background: '#007bff',
            color: '#fff',
            cursor: 'pointer'
          }}
          onClick={() => navigate('/homepage')}
        >
          AI Job Search
        </button>
      </div>

      <h2>Job Search</h2>
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <input
          type="text"
          placeholder="Search by skill, company, or job title"
          value={query}
          onChange={e => setQuery(e.target.value)}
          style={{ flex: 1, padding: '0.5rem', fontSize: '1rem' }}
        />
        <button type="submit" style={{ padding: '0.5rem 2rem' }} disabled={loading}>
          {loading ? 'Searching...' : 'Search Jobs'}
        </button>
      </form>
      {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
      <div>
        {jobs.length > 0 && (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {jobs.map((job, idx) => (
              <li key={idx} style={{ marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
                <strong>{job.title}</strong> at {job.company}<br />
                <span>{job.location}</span><br />
                <span>Skills: {Array.isArray(job.skills) ? job.skills.join(', ') : job.skills}</span>
              </li>
            ))}
          </ul>
        )}
        {jobs.length === 0 && !loading && <p>No jobs found. Try a different search.</p>}
      </div>
    </div>
  );
};

export default MainHomepage;
