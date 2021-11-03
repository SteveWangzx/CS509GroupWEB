import proxy from './proxy';

export const ws = 'ws://192.168.1.3:8081/v3';
export const baseUrl = proxy['/api'].target;
export const employerId = () => localStorage.getItem('paperless_employerId');
export const realname = () => localStorage.getItem('paperless_realname');
export const token = () => localStorage.getItem('paperless_token');
export const dataPermission = () =>
  localStorage.getItem('paperless_dataPermission');
export const userId = () => localStorage.getItem('paperless_userId');
export const userName = () => localStorage.getItem('paperless_username');
