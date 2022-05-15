import dayjs from 'dayjs';
import { IUser } from 'app/shared/model/user.model';
import { IPost } from 'app/shared/model/post.model';

export interface IComment {
  id?: number;
  date?: string | null;
  content?: string | null;
  author?: IUser | null;
  post?: IPost | null;
}

export const defaultValue: Readonly<IComment> = {};
