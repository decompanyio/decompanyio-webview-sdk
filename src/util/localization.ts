import commonData from './commonData'

const strings = new Map([
  [
    'brand',
    {
      KOR: '폴라리스 쉐어',
      ENG: 'Polaris Share'
    }
  ],
  // Search
  [
    'search-result',
    {
      KOR: '검색 결과',
      ENG: 'Search Result'
    }
  ],
  [
    'search',
    {
      KOR: '검색',
      ENG: 'Search'
    }
  ],
  // Modal
  [
    'common-modal-title',
    {
      KOR: '제목',
      ENG: 'Title'
    }
  ],
  [
    'common-modal-description',
    {
      KOR: '설명',
      ENG: 'Description'
    }
  ],

  // Tag
  [
    'tag-template',
    {
      KOR: '템플릿',
      ENG: 'Template'
    }
  ],

  // Common
  [
    'common-download',
    {
      KOR: '다운로드',
      ENG: 'Download'
    }
  ],
  [
    'common-delete',
    {
      KOR: '삭제',
      ENG: 'Delete'
    }
  ],
  [
    'common-modal-cancel',
    {
      KOR: '취소',
      ENG: 'Cancel'
    }
  ],
  [
    'common-modal-upload',
    {
      KOR: '업로드',
      ENG: 'Upload'
    }
  ],
  [
    'common-no-data',
    {
      KOR: '데이터가 없습니다',
      ENG: 'No Data'
    }
  ],
  [
    'common-logout',
    {
      KOR: '로그아웃',
      ENG: 'Sign out'
    }
  ],

  // ProfileCard
  [
    'profile-card-my-page',
    {
      KOR: '마이 페이지',
      ENG: 'My page'
    }
  ],

  // ProfileList
  [
    'profile-list-subject',
    {
      KOR: '님이 올린 문서',
      ENG: 'List of '
    }
  ],

  // Header
  [
    'header-login',
    {
      KOR: '로그인',
      ENG: 'Login'
    }
  ],

  // Upload
  [
    'upload-doc-error-1',
    {
      KOR: '제목은 한 글자 보다 길어야 합니다.',
      ENG: 'Title must be longer than 1 character.'
    }
  ],
  [
    'upload-explain-1',
    {
      KOR: '문서를 업로드하면 자동적으로 ',
      ENG:
        'When you upload a document, it is automatically displayed to other users of '
    }
  ],
  [
    'upload-explain-2',
    {
      KOR: '폴라리스 쉐어',
      ENG: ''
    }
  ],
  [
    'upload-explain-3',
    {
      KOR: '의 다른 이용자들에게 보여집니다.',
      ENG: ''
    }
  ],
  [
    'upload-explain-4',
    {
      KOR: '',
      ENG: 'Polaris Share.'
    }
  ],
  [
    'upload-explain-sub',
    {
      KOR: '자세한 내용을 확인하시려면, 위 링크를 클릭해주세요',
      ENG: 'For more details, please click the link above'
    }
  ],
  [
    'upload-limit-private-doc-subj',
    {
      KOR: '비공개 문서 보유 한도 초과',
      ENG: 'Exceeded private document retention limit'
    }
  ],
  [
    'upload-limit-private-doc-contents',
    {
      KOR:
        '이후에 문서를 업로드하시려면, 보유하신 비공개 문서를 Public(공개) 상태로 변경해 주시기 바랍니다.',
      ENG:
        'To upload your document later, please change it from Private to Public.'
    }
  ],
  [
    'upload-link-to-main',
    {
      KOR: '변경하러 가기',
      ENG: 'Go to change'
    }
  ],
  [
    'upload-cancel',
    {
      KOR: '업로드 취소',
      ENG: 'Cancel upload'
    }
  ],
  [
    'upload-complete',
    {
      KOR: '문서 업로드 완료',
      ENG: 'Upload document complete'
    }
  ],
  [
    'upload-doc-desc-1-a',
    {
      KOR: '현재 고객님의 비공개 문서는 ',
      ENG: 'You currently have '
    }
  ],
  [
    'upload-doc-desc-1-b',
    {
      KOR: `개이며, 최대 ${commonData.privateDocumentLimit}개까지만 업로드할 수 있습니다.`,
      ENG: ` private documents, and you can only upload up to ${commonData.privateDocumentLimit} of them.`
    }
  ],
  [
    'upload-doc-desc-2-a',
    {
      KOR: `현재 ${commonData.privateDocumentLimit}개의 비공개 문서를 보유중 입니다. 이후에 문서를 업로드하시려면, 보유하신 비공개 문서를 Public(공개) 상태로 변경해 주시기 바랍니다.`,
      ENG: `You currently have ${commonData.privateDocumentLimit} private documents. To upload your document later, please change it from Private to Public.`
    }
  ],
  [
    'upload-doc-desc-3-a',
    {
      KOR:
        '현재 업로드된 문서는 Private(비공개) 상태입니다. 문서를 공개하려고 하신다면, Public(공개) 상태로 변경해 주시기 바랍니다.',
      ENG:
        'The uploaded document is set to Private. To allow public access, please change the setting to Public.'
    }
  ],
  [
    '',
    {
      KOR: '',
      ENG: ''
    }
  ],
  [
    '',
    {
      KOR: '',
      ENG: ''
    }
  ],
  [
    '',
    {
      KOR: '',
      ENG: ''
    }
  ]
])

export enum Lang {
  EN = 'EN',
  KR = 'KR',
  HK = 'HK',
  ZH = 'ZH'
}

function getCookie(cname: string) {
  let name = cname + '='
  if (typeof document !== 'undefined') {
    let decodedCookie = decodeURIComponent(document.cookie)
    let ca = decodedCookie.split(';')
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) === ' ') {
        c = c.substring(1)
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length)
      }
    }
  }
  return ''
}

function setCookie(cname: string, cvalue: string, exdays: number) {
  let d = new Date()
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
  let expires = 'expires=' + d.toUTCString()
  if (typeof document !== 'undefined')
    document.cookie = cname + '=' + cvalue + '; ' + expires + '; path=/;'
}

function deleteCookie(name: string) {
  if (typeof document !== 'undefined')
    if (getCookie(name))
      document.cookie = name + '=;expires=Thu, 01-Jan-70 00:00:01 GMT'
}

function checkLocale(): Lang {
  let cookieLang = getCookie('language')

  // 쿠키 값이 있을 때
  if (cookieLang !== '') {
    switch (cookieLang) {
      case 'en':
        return Lang.EN

      case 'kr':
      default:
        return Lang.KR
    }
  }

  // 없을 때
  return Lang.KR
  /*let userLang = navigator.language;

  switch (userLang.toLowerCase()) {
    case 'en':
    case 'en-us':
      setCookie('language', 'en', 30);
      return Lang.EN;

    case 'ko-kr':
    case 'ko':
    default:
      setCookie('language', 'ko', 30);
      return Lang.KO;

  }*/
}

//let currentLang: Lang = Lang.EN;
let currentLang: Lang = checkLocale()

export function psGetLang(): Lang {
  return currentLang
}

export function psSetLang(lang: Lang) {
  currentLang = lang

  deleteCookie('language')

  switch (lang) {
    case Lang.EN:
      setCookie('language', 'en', 30)
      window.location.reload()
      break

    case Lang.KR:
    default:
      setCookie('language', 'kr', 30)
      window.location.reload()
      break
  }
}

export function psString(key: string): string {
  const string = strings.get(key)
  if (string !== undefined && string !== null) {
    switch (currentLang) {
      case Lang.EN:
        if (string.ENG === '') return string.KOR
        return string.ENG

      case Lang.KR:
      default:
        return string.KOR
    }
  } else {
    return '.' + key
  }
}
