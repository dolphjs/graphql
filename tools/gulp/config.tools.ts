import { getDirs } from './utilities/helpers.task';

export const source = ['common', 'core', 'decorators', 'packages'];
export const samplePath = 'sample';

export const packagePath = getDirs(source);
