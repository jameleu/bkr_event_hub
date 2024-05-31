export interface Event {
  id: number;
  name: string;
  description: string;
  start_time: Date;
  end_time: Date;
  // duration: number; // minutes
  location: string;
  cap: number;
  cat: number;
  leader: string;
  imageUrl: string;
}
