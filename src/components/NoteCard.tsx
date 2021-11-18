import React, { ReactElement } from 'react';

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
