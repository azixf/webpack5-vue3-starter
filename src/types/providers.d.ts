export type CustomRequest = (
  url: string,
  data?: Record<string, any>,
  options?: Record<string, any>
) => Promise<any>;

export type CustomHttp = {
  get: CustomRequest;
  put: CustomRequest;
  post: CustomRequest;
  delete: CustomRequest;
};
