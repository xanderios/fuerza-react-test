import React, { ReactElement, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import chill from '../assets/chill.png';

import { useAuth } from '../contexts/AuthContext';
import { Journal } from '../types/journal';
import Logo from '../components/Logo';

export default function Journals(): ReactElement {
  const { withSessionAPI, user } = useAuth();
  const [journals, setJournals] = useState<Journal[] | null>(null);

  useEffect(() => {
    withSessionAPI()
      .get(`/journals/entries${user?.id}`)
      .then((res) => {
        setJournals(res.data);
      });
  }, []);

  return (
    <div className="journals-page default-page">
      {journals ? (
        <div className="journal-list">
          {journals.map((journal) => (
            <p key={journal.id}>{journal.title}</p>
          ))}
        </div>
      ) : (
        <div className="journals-empty">
          <Logo />
          <div>
            <img className="person" src={chill} alt="Peace" />
            <Link to="/create-journal">Create a Journal</Link>
          </div>
          <span aria-hidden="true"></span>
        </div>
      )}
    </div>
  );
}
