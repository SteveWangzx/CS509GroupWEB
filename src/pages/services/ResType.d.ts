declare namespace ResType {
  export type Normal<T> = {
    success: boolean;
    code: number;
    message: string;
    data: T;
  };

  export type Pagination<T> = {
    success: boolean;
    code: number;
    message: string;
    data: {
      current: number;
      pageSize: number;
      total: number;
      records: T;
    };
  };
}
