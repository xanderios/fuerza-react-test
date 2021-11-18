import React, { ReactElement, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useJournals } from '../contexts/JournalsContext';

import { IEntry } from '../types/entry';

interface Props {
  note: IEntry;
}

export default function NoteCard({ note }: Props): ReactElement {
  return (
    <div className="note-card">
      <div className="card">
        <p className="content">{note?.content}</p>
      </div>
      <span className="undercard"></span>
    </div>
  );
}
