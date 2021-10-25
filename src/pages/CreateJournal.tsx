import React, { FormEvent, ReactElement, useState } from 'react';
import Button from '../components/Button';

import Logo from '../components/Logo';
import SimpleInput from '../components/SimpleInput';

export default function CreateJournal(): ReactElement {
  const [journalTitle, setJournalTitle] = useState<string>('HTML');

  function handleTitleInput(e: FormEvent<HTMLInputElement>) {
    setJournalTitle(e.currentTarget.value);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    return;
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
        />
        <div className="actions">
          <Button type="submit">Save journal</Button>
        </div>
      </form>
    </div>
  );
}
