import { request } from 'umi';

export type registerUsers = {
  uid: string;
  password: string;
  uname: string;
  type: string;
};

export type userActivity = {
  uaid: string;
  uid: string;
  activity: string;
  oid: string;
  time: string;
};

export type UAParmas = {
  quid: string;
};

export const fetchUsers = () =>
  request<ResType.Normal<registerUsers[]>>(
    'https://n63zuarfta.execute-api.us-east-2.amazonaws.com/Alpha/adminstor/getRegistered',
    {
      method: 'POST',
    },
  );

export const fetchUA = (data: UAParmas) =>
  request<ResType.Normal<userActivity[]>>(
    'https://n63zuarfta.execute-api.us-east-2.amazonaws.com/Alpha/adminstor/getActivityUser ',
    {
      method: 'POST',
      data,
    },
  );
