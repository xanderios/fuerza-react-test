import React, { ReactElement, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

import chill from '../assets/chill.png';
import Logo from '../components/Logo';
import NoteCard from '../components/NoteCard';
import { IconArrowLeft } from '../components/icons/ArrowLeft';
import { useJournals } from '../contexts/JournalsContext';
import { IEntry } from '../types/entry';

interface IQuery {
  journalId: string;
}

export default function JournalEntries(): ReactElement {
  const { journalId }: IQuery = useParams();
  const { journal, notes, fetchJournal, fetchNotes } = useJournals();

  useEffect(() => {
    fetchJournal(journalId);
    fetchNotes(journalId);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="notes-page default-page">
      {notes?.length >= 1 ? (
        <div>
          <Logo />
          <div className="header">
            <Link to="/journals">
              <div className="return-page">
                <IconArrowLeft />
                <p>Journals</p>
              </div>
            </Link>
            <Link to={`/create-note/${journalId}`}>
              <button className="btn btn--stroke">
                <span className="text-2xl">+</span> Add note
              </button>
            </Link>
          </div>

          <div className="note-list">
            {notes.map((note: IEntry) => (
              <NoteCard key={note.id} note={note} />
            ))}
          </div>
        </div>
      ) : (
        <div className="notes-empty">
          <Logo />
          <div className="content">
            <p className="text-2xl font-serif">{journal?.title}</p>
            <img className="person" src={chill} alt="Peace" />
            <Link to={`/create-note/${journalId}`}>Create a Note</Link>
          </div>
          <span aria-hidden="true"></span>
        </div>
      )}
    </div>
  );
}
