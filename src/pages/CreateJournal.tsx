import React, { FormEvent, ReactElement, useState } from 'react';
import { useHistory } from 'react-router';

import Button from '../components/Button';
import Logo from '../components/Logo';
import SimpleInput from '../components/SimpleInput';
import { useAuth } from '../contexts/AuthContext';
import { useJournals } from '../contexts/JournalsContext';

export default function CreateJournal(): ReactElement {
  const [journalTitle, setJournalTitle] = useState<string>('My Journal');
  const { createJournal } = useJournals();

  function handleTitleInput(e: FormEvent<HTMLInputElement>) {
    setJournalTitle(e.currentTarget.value);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    createJournal(journalTitle);
  }

  return (
    <div className="create-journal-page default-page">
      <Logo />
      <div className="cover">
        <span className="cover-spine"></span>
        <p className="cover-title font-serif text-2xl">{journalTitle}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <SimpleInput
          type="text"
          value={journalTitle}
          onChange={handleTitleInput}
          placeholder="Journal title"
          maxLength={40}
        />
        <div className="actions">
          <Button type="submit">Save journal</Button>
        </div>
      </form>
    </div>
  );
}
