export interface RawList {
  _id: string;
  title: string;
  date: string;
  __v: number;
  isMain: boolean;
}

export interface List extends Pick<RawList, 'title' | 'isMain'> {
  id: RawList['_id'];
  date: Date;
}

export type CreateList = Pick<List, 'title' | 'date'>;
export interface UpdateList extends Pick<List, 'id'>, Partial<CreateList> {}
