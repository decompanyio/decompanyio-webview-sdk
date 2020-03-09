import ContentsList from '../components/body/contents/ContentsList'
import ProfileList from '../components/body/profile/ProfileList'
import Upload from '../components/body/upload/Upload'
import SearchList from '../components/body/search/SearchList'

export default [
  {
    path: '/',
    name: 'ContentsList',
    component: ContentsList
  },
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
    path: '*',
    name: 'NotFoundPage',
    component: 'NotFoundPage'
  }
]
