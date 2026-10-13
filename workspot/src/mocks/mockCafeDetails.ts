import type { CafeDetailProps } from "../types/CafeProps";

export const mockCafeDetails: CafeDetailProps[] = [
  {
    id: 1,
    name: '카페 온더테이블',
    distance: 120,
    address: '경기도 용인시 처인구',
    operatingHours: '08:00 - 22:00',
    phone: '010-1234-5678',
    imageUrls: [
      'https://picsum.photos/600/400?random=11',
      'https://picsum.photos/600/400?random=12',
      'https://picsum.photos/600/400?random=13',
    ],

    workspace: {
      noise: '적합',
      outlet: '적합',
      wifi: '적합',
      atmosphere: '모던',
      table: '적합',
      longStay: '적합',
    },

    recommendation: {
      score: 92,
      reason:
        '조용한 환경과 콘센트 이용이 적합하여 장시간 노트북 작업에 잘 맞는 공간입니다.',
    },
  },

  {
    id: 2,
    name: '워크브루 강남점',
    distance: 300,
    address: '경기도 용인시 처인구',
    operatingHours: '09:00 - 23:00',
    phone: '010-2345-6789',
    imageUrls: [
      'https://picsum.photos/600/400?random=21',
      'https://picsum.photos/600/400?random=22',
    ],

    workspace: {
      noise: '보통',
      outlet: '적합',
      wifi: '적합',
      atmosphere: '감성적인',
      table: '적합',
      longStay: '보통',
    },

    recommendation: {
      score: 87,
      reason:
        'Wi-Fi와 작업 환경이 좋아 노트북 작업에 적합하지만 시간대에 따라 다소 혼잡할 수 있습니다.',
    },
  },

  {
    id: 3,
    name: '카페 모먼트',
    distance: 450,
    address: '경기도 용인시 처인구',
    operatingHours: '10:00 - 21:00',
    phone: '010-3456-7890',
    imageUrls: [
      'https://picsum.photos/600/400?random=31',
      'https://picsum.photos/600/400?random=32',
    ],

    workspace: {
      noise: '적합',
      outlet: '보통',
      wifi: '보통',
      atmosphere: '아늑한',
      table: '적합',
      longStay: '적합',
    },

    recommendation: {
      score: 83,
      reason:
        '조용하고 테이블이 넓어 집중해서 작업하기 좋은 공간입니다.',
    },
  },

  {
    id: 4,
    name: '브루랩',
    distance: 620,
    address: '경기도 용인시 처인구',
    operatingHours: '08:30 - 22:30',
    phone: '010-4567-8901',
    imageUrls: [
      'https://picsum.photos/600/400?random=41',
    ],

    workspace: {
      noise: '보통',
      outlet: '적합',
      wifi: '적합',
      atmosphere: '깔끔한',
      table: '보통',
      longStay: '보통',
    },

    recommendation: {
      score: 79,
      reason:
        '콘센트와 Wi-Fi 환경이 좋아 기본적인 노트북 작업에 적합합니다.',
    },
  },

  {
    id: 5,
    name: '페이지 카페',
    distance: 850,
    address: '경기도 용인시 처인구',
    operatingHours: '10:00 - 24:00',
    phone: '010-5678-9012',
    imageUrls: [
      'https://picsum.photos/600/400?random=51',
      'https://picsum.photos/600/400?random=52',
    ],

    workspace: {
      noise: '보통',
      outlet: '보통',
      wifi: '적합',
      atmosphere: '따뜻한',
      table: '적합',
      longStay: '적합',
    },

    recommendation: {
      score: 74,
      reason:
        '테이블이 넓고 장시간 이용이 가능해 여유롭게 작업하기 좋은 공간입니다.',
    },
  },
]