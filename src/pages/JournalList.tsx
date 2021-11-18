import React, { ReactElement, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import chill from '../assets/chill.png';

import Logo from '../components/Logo';
import JournalCard from '../components/JournalCard';
import { useJournals } from '../contexts/JournalsContext';

export default function Journals(): ReactElement {
  const { journals, fetchJournals } = useJournals();

  useEffect(() => {
    fetchJournals();
  }, []);

  return (
    <div className="journals-page default-page">
      {journals ? (
        <div>
          <div className="header">
            <Logo />
            <Link className="link" to="/create-journal">
              <button className="btn btn--stroke">
                <span className="text-xl">+</span> Add Journal
              </button>
            </Link>
          </div>
          <div className="journal-list">
            {journals?.map((journal) => (
              <Link key={journal.id} to={`/journals/entries/${journal.id}`}>
                <JournalCard {...journal} />
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="journals-empty">
          <Logo />
          <div className="content">
            <img className="person" src={chill} alt="Peace" />
            <Link to="/create-journal">Create a Journal</Link>
          </div>
          <span aria-hidden="true"></span>
        </div>
      )}
    </div>
  );
}
