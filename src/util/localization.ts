const strings = new Map([
  // Search
  [
    'search-result',
    {
      KOR: '검색 결과',
      ENG: 'Search Result'
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

  // ProfileCard
  [
    'profile-card-my-page',
    {
      KOR: '마이 페이지',
      ENG: 'My page'
    }
  ],
  [
    'profile-card-logout',
    {
      KOR: '로그아웃',
      ENG: 'Sign out'
    }
  ],

  // ProfileList
  [
    'profile-list-subject',
    {
      KOR: '내가 올린 문서',
      ENG: 'My list'
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
