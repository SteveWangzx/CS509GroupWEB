import { request } from 'umi';

export type TableListItem = {
  aid: string;
  iid: string;
  author: string;
  language: string;
  time: string;
  code: string;
};

export type ProblemListItem = {
  output: string;
  input: string;
  timecomplexitytype: string;
  pid: string;
  aid: string;
};

export type BenchmarksListItem = {
  core: string;
  l1cache: string;
  chip: string;
  iid: string;
  name: string;
  pid: string;
  time: string;
  thread: string;
  bid: string;
  l2cache: string;
};

export type ImplementationParams = {
  aid: string;
  uid: string;
};

export type BenchmarksParams = {
  iid: string;
  pid: string;
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

export const FetchImplementationList = (data: ImplementationParams) =>
  request<ResType.Normal<TableListItem[]>>(
    'https://n63zuarfta.execute-api.us-east-2.amazonaws.com/Alpha/classification/Implementation/get',
    {
      method: 'Post',
      data: data,
    },
  );

export const FetchProblemList = (data: ImplementationParams) =>
  request<ResType.Normal<ProblemListItem[]>>(
    'https://n63zuarfta.execute-api.us-east-2.amazonaws.com/Alpha/classification/ProblemInstance/get',
    {
      method: 'POST',
      data: data,
    },
  );

export const FetchBenchMarksList = (data: BenchmarksParams) =>
  request<ResType.Normal<BenchmarksListItem[]>>(
    'https://n63zuarfta.execute-api.us-east-2.amazonaws.com/Alpha/classification/Benchmark/get',
    {
      method: 'POST',
      data: data,
    },
  );
