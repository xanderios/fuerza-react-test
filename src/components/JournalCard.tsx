import React, { ReactElement } from 'react';
import { IJournal } from '../types/journal';

interface Props extends IJournal {}

export default function JournalCard({ title }: Props): ReactElement {
  return (
    <div className="journal-card">
      <span className="journal-spine"></span>
      <span className="journal-cover">
        <p className="journal-title font-serif text-2xl">{title}</p>
      </span>
    </div>
  );
}
