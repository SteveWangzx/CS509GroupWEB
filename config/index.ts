import proxy from './proxy';

export const ws = 'ws://192.168.1.3:8081/v3';
export const baseUrl = proxy['/api'].target;
export const userName = () => localStorage.getItem('ams_uname');
export const type = () => localStorage.getItem('ams_type');
