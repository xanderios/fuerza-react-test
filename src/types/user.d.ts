export interface IUser {
  id?: string;
  username: string;
  email: string;
  password?: string;
  journalIds: string[] | null;
}
