import { Response, Request } from 'miragejs';
import { handleErrors } from '../server';
import { IJournal } from '../../../types/journal';
import { IEntry } from '../../../types/entry';
import dayjs from 'dayjs';
import { IUser } from '../../../types/user';

export const create = (
  schema: any,
  req: Request
): { user: IUser; journal: IJournal } | Response => {
  try {
    const { title, userId } = JSON.parse(req.requestBody) as Partial<IJournal>;
    const exUser = schema.users.findBy({ id: userId });
    if (!exUser) {
      return handleErrors(null, 'No such user exists.');
    }
    const now = dayjs().format();
    const journal = exUser.createJournal({
      title,
      type: 'public',
      createdAt: now,
      updatedAt: now,
    });
    return {
      user: {
        ...exUser.attrs,
      },
      journal: journal.attrs,
    };
  } catch (error) {
    return handleErrors(error, 'Failed to create Journal.');
  }
};

export const addEntry = (
  schema: any,
  req: Request
): { journal: IJournal; entry: IEntry } | Response => {
  try {
    const journal = schema.journals.find(req.params.id);
    const { title, content } = JSON.parse(req.requestBody) as Partial<IEntry>;
    const now = dayjs().format();
    const entry = journal.createEntry({
      title,
      content,
      createdAt: now,
      updatedAt: now,
    });
    journal.update({
      ...journal.attrs,
      updatedAt: now,
    });
    return {
      journal: journal.attrs,
      entry: entry.attrs,
    };
  } catch (error) {
    return handleErrors(error, 'Failed to save entry.');
  }
};

export const getJournals = (
  schema: any,
  req: Request
): IJournal[] | Response => {
  try {
    const user = schema.users.find(req.params.id);
    return user.journal as IJournal[];
  } catch (error) {
    return handleErrors(error, 'Could not get user journals.');
  }
};

export const getEntries = (
  schema: any,
  req: Request
): { entries: IEntry[] } | Response => {
  try {
    const journal = schema.journals.find(req.params.id);
    return journal.entry;
  } catch (error) {
    return handleErrors(error, 'Failed to get Journal entries.');
  }
};

export const updateJournal = (
  schema: any,
  req: Request
): IJournal | Response => {
  try {
    const journal = schema.journals.find(req.params.id);
    const data = JSON.parse(req.requestBody) as Partial<IJournal>;
    const now = dayjs().format();
    journal.update({
      ...data,
      updatedAt: now,
    });
    return journal.attrs as IJournal;
  } catch (error) {
    return handleErrors(error, 'Failed to update Journal.');
  }
};

export const updateEntry = (schema: any, req: Request): IEntry | Response => {
  try {
    const entry = schema.entries.find(req.params.id);
    const data = JSON.parse(req.requestBody) as Partial<IEntry>;
    const now = dayjs().format();
    entry.update({
      ...data,
      updatedAt: now,
    });
    return entry.attrs as IEntry;
  } catch (error) {
    return handleErrors(error, 'Failed to update entry.');
  }
};
