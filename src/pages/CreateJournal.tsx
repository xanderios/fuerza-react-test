import React, { FormEvent, ReactElement, useState } from 'react';

import { useJournals } from '../contexts/JournalsContext';
import Button from '../components/Button';
import Logo from '../components/Logo';
import Modal from '../components/Modal';
import SimpleInput from '../components/SimpleInput';

export default function CreateJournal(): ReactElement {
  const [journalTitle, setJournalTitle] = useState<string>('My journal');
  const { createJournal, modalError, changeError } = useJournals();

  function handleTitleInput(e: FormEvent<HTMLInputElement>) {
    changeError(null);
    setJournalTitle(e.currentTarget.value);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    createJournal(journalTitle);
  }

  return (
    <div className="create-journal-page default-page">
      <Modal message={modalError} changeMessage={changeError} />
      <Logo />
      <div className="cover">
        <span className="cover-spine"></span>
        <span className="cover-body">
          <p className="cover-title font-serif text-2xl">{journalTitle}</p>
        </span>
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
