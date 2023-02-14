import axios from 'axios';

export const Api = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '33537725-a8679d3861aff0828500fd2a2',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 12,
  },
});

