import dayjs from 'dayjs';
import { IUser } from 'app/shared/model/user.model';
import { Tag } from 'app/shared/model/enumerations/tag.model';
import { Type } from 'app/shared/model/enumerations/type.model';

export interface IPost {
  id?: number;
  date?: string | null;
  content?: string | null;
  location?: string | null;
  verified?: boolean | null;
  completed?: boolean | null;
  tags?: Tag | null;
  types?: Type | null;
  poster?: IUser | null;
}

export const defaultValue: Readonly<IPost> = {
  verified: false,
  completed: false,
};
