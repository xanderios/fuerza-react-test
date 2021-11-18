import React, { createContext, useState, ReactNode, useContext } from 'react';
import { useHistory, useParams } from 'react-router';
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
    await withSessionAPI()
      .post('/journals', {
        title: journalTitle,
        userId: user.id,
      })
      .then((res) => {
        history.push('/journals');
      })
      .catch((err) => {
        console.log(err);
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
    await withSessionAPI()
      .post(`/journals/entry/${journalId}`, {
        title,
        content,
      })
      .then(() => {
        history.push(`/journals/entries/${journalId}`);
      })
      .catch((err) => {
        console.log(err);
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
