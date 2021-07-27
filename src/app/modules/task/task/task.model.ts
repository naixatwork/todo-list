import { List } from '#modules/task/list/list.model';

export interface RawTask {
  _id: string;
  date: string;
  description: string;
  title: string;
  list: string;
  done: boolean;
}

export interface SituationalTask {
  count: number;
  data: {
    queue: Array<Task>;
    completed: Array<Task>;
  };
}

export interface Task extends Pick<RawTask, 'title' | 'description' | 'done'> {
  id: RawTask['_id'];
  date: Date;
  list: List['id'];
}

export interface CreateTask
  extends Pick<Task, 'title' | 'description' | 'list'> {
  done: false;
}
export interface UpdateTask
  extends Pick<Task, 'id' | 'done'>,
    Partial<Pick<CreateTask, 'title' | 'description'>> {}
