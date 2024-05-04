export interface Event {
  id: number;
  name: string;
  description: string;
  dateTime: Date;
  duration: number; // minutes
  location: string;
  leader: string;
  imageUrl: string;
}
