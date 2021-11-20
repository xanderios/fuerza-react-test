import React, { createContext, useState, ReactNode, useContext } from 'react';
import { useHistory } from 'react-router';
import { IEntry } from '../types/entry';

import { IJournal } from '../types/journal';
import { useAuth } from './AuthContext';

interface journalsContextData {
  journals: null | IJournal[];
  journal: null | IJournal;
  notes: null | IEntry[];
  fetchJournals: () => void;
  createJournal: (journalTitle: string) => void;
  fetchJournal: (journalId: string) => void;
  fetchNotes: (journalId: string) => void;
  createNote: (journalId: string, title: string, content: string) => void;
  modalError: null | string;
  changeError: (value: null | string) => void;
}

interface JournalsProviderProps {
  children: ReactNode;
}

export const JournalsContext = createContext({} as journalsContextData);

export function JournalsProvider({ children }: JournalsProviderProps) {
  const history = useHistory();
  const { withSessionAPI, user } = useAuth();

  const [journals, setJournals] = useState<null | IJournal[]>(null);
  const [journal, setJournal] = useState<null | IJournal>(null);
  const [notes, setNotes] = useState<null | IEntry[]>(null);
  const [modalError, setModalError] = useState<null | string>(null);

  async function fetchJournals() {
    const response: any = await withSessionAPI().get(`/journals/${user?.id}`);
    if (response.journals.length <= 0) return;

    setJournals(response.journals);
  }

  async function createJournal(journalTitle: string) {
    if (journalTitle.length > 20) {
      changeError('Journal title must have 20 characters or less');
      return;
    }
    if (journalTitle.length <= 0) {
      changeError('Journal title must have at least 1 character length');
      return;
    }

    changeError(null);
    await withSessionAPI()
      .post('/journals', {
        title: journalTitle,
        userId: user.id,
      })
      .then(() => {
        changeError(null);
        history.push('/journals');
      })
      .catch((err) => {
        changeError('There was an error with your submission');
        console.log(err);
        return;
      });
  }

  async function fetchJournal(journalId: string) {
    await withSessionAPI()
      .get(`/journals/${user.id}`)
      .then((res: any) => {
        console.log(res.journals);
        const journalData = res.journals.find(
          (journal: IEntry) => journal.id === journalId
        );
        setJournal(journalData);
      });
  }

  async function fetchNotes(journalId: string) {
    const response: any = await withSessionAPI().get(
      `/journals/entries/${journalId}`
    );
    setNotes(response.entries);
  }

  async function createNote(journalId: string, title: string, content: string) {
    if (title.length <= 0) {
      changeError('Note title must have at least 1 character length');
      return;
    }
    if (title.length > 20) {
      changeError('Note title must have 20 characters or less');
      return;
    }
    if (content.length <= 6) {
      changeError('Note content must have at least 7 character length');
      return;
    }
    if (content.length > 200) {
      changeError('Note content must have 200 characters or less');
      return;
    }

    changeError(null);
    await withSessionAPI()
      .post(`/journals/entry/${journalId}`, {
        title,
        content,
      })
      .then(() => {
        changeError(null);
        history.push(`/journals/entries/${journalId}`);
      })
      .catch((err) => {
        changeError('An error ocurred. Please try again');
        console.log(err);
        return;
      });
  }

  function changeError(value: null | string) {
    setModalError(value);
  }

  return (
    <JournalsContext.Provider
      value={{
        journals,
        journal,
        notes,
        fetchJournals,
        createJournal,
        fetchJournal,
        fetchNotes,
        createNote,
        modalError,
        changeError,
      }}
    >
      {children}
    </JournalsContext.Provider>
  );
}

export const useJournals = () => useContext(JournalsContext);
