import React, { FormEvent, ReactElement, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';

import Button from '../components/Button';
import Logo from '../components/Logo';
import SimpleInput from '../components/SimpleInput';
import { IconArrowLeft } from '../components/icons/ArrowLeft';
import { useAuth } from '../contexts/AuthContext';
import { IJournal } from '../types/journal';
import { useJournals } from '../contexts/JournalsContext';

interface IQuery {
  journalId: string;
}

export default function CreateNote(): ReactElement {
  const { journalId }: IQuery = useParams();
  const [noteTitle, setNoteTitle] = useState<string>('My note');
  const [noteContent, setNoteContent] = useState<string>(
    'This is a cool reminder.'
  );
  const { journal, fetchJournal } = useJournals();
  const { createNote } = useJournals();

  function handleTitleInput(e: FormEvent<HTMLInputElement>) {
    setNoteTitle(e.currentTarget.value);
  }

  function handleContentInput(e: FormEvent<HTMLTextAreaElement>) {
    setNoteContent(e.currentTarget.value);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    createNote(journalId, noteTitle, noteContent);
  }

  useEffect(() => {
    fetchJournal(journalId);
  }, []);

  return (
    <div className="create-note-page default-page">
      <Logo />
      <div className="header">
        <Link to={`/journals/entries${journalId}`}>
          <div className="return-page">
            <IconArrowLeft />
            <p>{journal?.title}</p>
          </div>
        </Link>
      </div>
      <form onSubmit={handleSubmit}>
        <SimpleInput
          type="text"
          value={noteTitle}
          onChange={handleTitleInput}
          placeholder="Title"
          maxLength={40}
        />
        <textarea
          className="input"
          value={noteContent}
          onChange={handleContentInput}
          placeholder="Write your note"
          maxLength={200}
        />
        <div className="actions">
          <Button type="submit">Save Note</Button>
        </div>
      </form>
    </div>
  );
}
