const apiPath = '/api/v1';

export const appsPath = `${apiPath}/apps`;

export const httpMethod = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

export const httpStatus = {
  UNAUTHORIZED: 401,
};

export const header = {
  AUTHORIZATION: 'Authorization',
  CONTENT_TYPE: 'Content-Type',
  XSRF_TOKEN: 'X-XSRF-TOKEN',
};

export const contentType = {
  JSON: 'application/json',
};
