import get from 'lodash/get';
import history from '@tmp/history';
import { IProjectList, IProjectItem } from '@/enums';

export const getBasename = (path: string): string => {
  return path
    .split('/')
    .filter(name => name)
    .slice(-1)[0];
};

export const findProjectPath = (data: IProjectList) => {
  const path = get(data, `projectsByKey.${get(data, 'currentProject')}.path`);

  if (!path) {
    // throw new Error('findProjectPath path not existed');
    console.error('findProjectPath path not existed');
  }

  return path;
};

export const handleBack = (reload = true, url = '/project/select') => {
  history.replace(url);
  if (reload) {
    window.location.reload();
  }
};

interface IProjectListItem extends IProjectItem {
  key: string;
}

export const getProjectStatus = (item: IProjectListItem): 'success' | 'failure' | 'progress' => {
  if (get(item, 'creatingProgress.success')) return 'success';
  if (get(item, 'creatingProgress.failure')) return 'failure';
  if (item.creatingProgress) return 'progress';
  return 'success';
};