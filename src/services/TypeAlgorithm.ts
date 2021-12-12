import { request } from 'umi';

export type TableListItem = {
  aid: string;
  iid: string;
  author: string;
  language: string;
  time: string;
  code: string;
};

export type ImplementationParams = {
  aid: string;
  uid: string;
};

export type info = {
  aid: string;
  bucketurl: string;
  parentcid: string;
  url: string;
  name: string;
  introduction: string;
  content: string;
  timecplx: string;
  spacecplx: string;
};

export type problemInstanceList = {};

export const FetchImplementationList = (data: ImplementationParams) =>
  request<ResType.Normal<TableListItem[]>>(
    'https://n63zuarfta.execute-api.us-east-2.amazonaws.com/Alpha/classification/Implementation/get',
    {
      method: 'Post',
      data: data,
    },
  );
