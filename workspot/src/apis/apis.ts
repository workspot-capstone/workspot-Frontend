import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 응답 인터셉터
api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (axios.isAxiosError(error)) {
      if (!error.response) {
        console.error('네트워크 오류:', error.message);
      } else {
        switch (error.response.status) {
          case 400:
            console.error('잘못된 요청입니다.');
            break;
          case 404:
            console.error('요청한 데이터를 찾을 수 없습니다.');
            break;
          case 500:
            console.error('서버 오류가 발생했습니다.');
            break;
        }
      }
    }

    return Promise.reject(error);
  }
);