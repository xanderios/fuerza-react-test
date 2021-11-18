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

  async function fetchJournals() {
    const response: any = await withSessionAPI().get(`/journals/${user?.id}`);
    if (response.journals.length <= 0) return;

    setJournals(response.journals);
  }

  async function createJournal(journalTitle: string) {
    if (journalTitle.length > 20) {
      alert('Journal title must be 20 characters or shorter');
      return;
    }
    if (journalTitle.length <= 0) {
      alert('Journal title must be at least 1 character length');
      return;
    }

    await withSessionAPI()
      .post('/journals', {
        title: journalTitle,
        userId: user.id,
      })
      .then(() => {
        history.push('/journals');
      })
      .catch((err) => {
        alert('There was an error with your submission');
        console.log(err);
        return;
      });
  }

  async function fetchJournal(journalId: string) {
    await withSessionAPI()
      .get(`/journals/${user.id}`)
      .then((res: any) => {
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
      alert('Note title must be at least 1 character length');
      return;
    }
    if (title.length > 20) {
      alert('Note title must have 20 characters or less');
      return;
    }
    if (content.length <= 6) {
      alert('Note content must be at least 7 character length');
      return;
    }
    if (content.length > 200) {
      alert('Note content must have 200 characters or less');
      return;
    }

    await withSessionAPI()
      .post(`/journals/entry/${journalId}`, {
        title,
        content,
      })
      .then(() => {
        history.push(`/journals/entries/${journalId}`);
      })
      .catch((err) => {
        alert('There was an error with your submission');
        console.log(err);
        return;
      });
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
      }}
    >
      {children}
    </JournalsContext.Provider>
  );
}

export const useJournals = () => useContext(JournalsContext);
