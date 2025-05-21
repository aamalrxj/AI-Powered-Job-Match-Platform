import React, { useState } from 'react';
import axios from 'axios';

const UserJobSearch = () => {
  const [form, setForm] = useState({ skills: '', experience: '', location: '' });
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setJobs([]);
    try {
      const apiKey = ''; // Replace with your OpenAI key
      const prompt = `Generate a list of 5 job titles for a ${form.skills} developer with ${form.experience} experience in ${form.location}. Format as a JSON array: [{ "title": "...", "company": "...", "location": "...", "description": "..." }]`;

      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.7,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      // Extract the generated JSON
      const generatedText = response.data.choices[0].message.content;
      const parsedJobs = JSON.parse(generatedText);
      setJobs(parsedJobs);
    } catch (err) {
      setError('Failed to fetch jobs. Please check your inputs and try again.');
      console.error('OpenAI Error:', err);
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 500, margin: "2rem auto" }}>
      <h2>Find Jobs Matching Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="skills"
          placeholder="Skills (e.g. JavaScript, Python)"
          value={form.skills}
          onChange={handleChange}
          required
        /><br /><br />
        <input
          name="experience"
          placeholder="Experience (e.g. 3 years, Senior)"
          value={form.experience}
          onChange={handleChange}
          required
        /><br /><br />
        <input
          name="location"
          placeholder="Location (e.g. London, Remote)"
          value={form.location}
          onChange={handleChange}
          required
        /><br /><br />
        <button type="submit" disabled={loading}>
          {loading ? 'Generating Jobs...' : 'Generate Jobs'}
        </button>
      </form>
      {error && <div style={{ color: 'red', marginTop: '1rem' }}>{error}</div>}
      <div style={{ marginTop: "2rem" }}>
        {jobs.length > 0 && <h3>Generated Job Listings:</h3>}
        <ul>
          {jobs.map((job, idx) => (
            <li key={idx} style={{ marginBottom: '1.5rem' }}>
              <strong>{job.title}</strong> at {job.company}<br />
              <span>{job.location}</span><br />
              <p>{job.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserJobSearch;
