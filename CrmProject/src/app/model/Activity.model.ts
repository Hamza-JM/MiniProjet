export interface Activity {
  id?: number;
  date: Date;
  participants: string[] | undefined
  subject: string;
  note: string;
}
