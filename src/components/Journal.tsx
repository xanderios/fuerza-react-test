import React, { ReactElement, useEffect, useState } from 'react';
import api from '../services/api';
import { Journal } from '../interfaces/journal.interface';
import { AxiosResponse } from 'axios';

interface Props {
  noteId: string;
}

export default function Note({ noteId }: Props): ReactElement {
  const [note, setNote] = useState<null | Journal>(null);

  useEffect(() => {
    api.get(`/journal/entries/${noteId}`).then((res: AxiosResponse) => {
      setNote(res.data);
    });
  }, []);

  return (
    <div>
      <div>{note?.title}</div>
    </div>
  );
}
