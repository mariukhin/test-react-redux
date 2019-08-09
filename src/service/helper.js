export const changeDate = date => {
  const infoDate = new Date(Date.parse(date));
  return infoDate.toLocaleDateString('en-US');
};

export const DEFAULT_API = 'https://simple-blog-api.crew.red';

export const axiosConfig = {
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
};
