import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Api } from 'Api/Api';

export const loadImage = async params => {
  Loading.hourglass({
    svgColor: 'blue',
  });
  const { data } = await Api.get('', {
    params,
  });
  Loading.remove();
  return data;
};
