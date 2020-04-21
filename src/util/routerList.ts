import ProfileList from '../components/body/profile/ProfileList'
import Upload from '../components/body/upload/Upload'
import SearchList from '../components/body/search/SearchList'
import Login from '../components/body/auth/Login'
import Callback from '../components/Callback'

export default [
  {
    path: '/',
    name: 'Upload',
    component: Upload
  } /*
  {
    path: '/',
    name: 'ContentsList',
    component: ContentsList
  },*/,
  {
    path: '/profile',
    name: 'ProfileList',
    component: ProfileList
  },
  {
    path: '/upload',
    name: 'Upload',
    component: Upload
  },
  {
    path: '/search',
    name: 'SearchList',
    component: SearchList
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/callback',
    name: 'Callback',
    component: Callback
  },
  {
    path: '*',
    name: 'NotFoundPage',
    component: 'NotFoundPage'
  }
]
