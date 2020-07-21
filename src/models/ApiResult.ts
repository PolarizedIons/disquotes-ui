export type ApiResult<T> =
  | {
      status: number;
      success: true;
      data: T;
    }
  | {
      status: number;
      success: false;
      error: string;
      excpetion: string | null;
    };
