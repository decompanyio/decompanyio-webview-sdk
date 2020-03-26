export default {
  // PO 정보
  infoFromPO: {
    extension: 'pptx',
    tag: 'template'
  },

  // 기본 로그인 플랫폼
  defaultLoginPlatform: 'google',

  // 공통 타이틀
  commonTitle: ' | Polaris Share',

  // 메인 페이지 카테고리 리스트
  pathArr: ['mylist', 'popular', 'featured', 'latest', 'history'],

  // 태그 리스트 목업
  tagList: [
    'art',
    'beauty',
    'style',
    'literature',
    'culture',
    'entertainment',
    'food',
    'photography',
    'social',
    'design',
    'business',
    'economy',
    'leadership',
    'marketing',
    'etc',
    'programming',
    'cybersecurity',
    'academia',
    'science',
    'technology',
    'health',
    'travel',
    'pets',
    'psychology',
    'self',
    'sexuality',
    'education',
    'environment',
    'law',
    'history',
    'language',
    'media',
    'philosophy',
    'politics',
    'religion',
    'society',
    'world'
  ],

  // 메타 데이터 기본값
  metaData: {
    title: 'Polaris Share',
    seoTitle: 'Polaris Share',
    tag: '',
    extension: '',
    description: 'Sharing knowledge in new ways',
    twitter: {
      card: 'summary_large_image',
      site: '@Polaris Share',
      title: 'Polaris Share',
      description: 'Sharing knowledge in new ways',
      image: 'https://www.polarishare.com/logo.png',
      url: 'https://www.polarishare.com'
    },
    og: {
      /*eslint-disable @typescript-eslint/camelcase*/
      site_name: 'Polaris Share',
      image_width: '720',
      image_height: '498',
      /*eslint-disable @typescript-eslint/camelcase*/
      type: 'website',
      title: 'Polaris Share',
      description: 'Sharing knowledge in new ways',
      url: 'https://www.polarishare.com'
    }
  },

  // 크리에이터 리워드 풀
  creatorDailyRewardPool: Number(115068493148000000000000),

  // 큐레이터 리워드 풀
  curatorDailyRewardPool: Number(49315068492000000000000),

  // 트랙킹 딜레이 시간 : 3초
  trackingDelayTime: 3000,

  // 자리비움 체크 시간: 1분
  awayCheckTime: 60000,

  // Alert 창 종료 시간: 7초
  alertRemainTime: 7000,

  // My page 리스트 개수
  myPageListSize: 10,

  style: {
    md: {
      max: {
        width: 767
      },
      min: {
        width: 768
      }
    },
    common: {
      margin: 15 // common margin
    },
    container: {
      width: 1280 // common container width
    }
  }
}
