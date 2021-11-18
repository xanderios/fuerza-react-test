import React, { ReactElement, useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { useAuth } from '../contexts/AuthContext';
import { IEntry } from '../types/entry';

interface Props {}

interface IParams {
  noteId: string;
}

export default function Note({}: Props): ReactElement {
  const { noteId }: IParams = useParams();
  const { withSessionAPI } = useAuth();
  const [note, setNote] = useState<null | IEntry>(null);

  useEffect(() => {
    (async () => {
      await withSessionAPI()
        .get(`journals/entries/${noteId}`)
        .then((response) => {
          setNote(response.data);
        });
    })();
  }, []);

  return (
    <div>
      <p>{note.title}</p>
    </div>
  );
}
