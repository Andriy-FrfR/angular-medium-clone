import { Profile } from './profile.interface';

export interface Comment {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  body: string;
  author: Profile;
}
