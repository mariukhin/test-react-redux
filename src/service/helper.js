export function postById(posts, id) {
  return posts.find(item => item.id === id);
}
export const checkId = ({ match: { params } }, postId) => {
  const idFromMatch = params[postId];
  return postById(idFromMatch);
};

export const changeDate = date => {
  const infoDate = new Date(Date.parse(date));
  return infoDate.toLocaleDateString();
};

export const DEFAULT_API = 'https://simple-blog-api.crew.red';

export const axiosConfig = {
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
};
