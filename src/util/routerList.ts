import Upload from '../components/body/upload/Upload'
import Callback from '../components/Callback'

export default [
  {
    path: '/',
    name: 'Upload',
    component: Upload
  },
  {
    path: '/upload',
    name: 'Upload',
    component: Upload
  },
  {
    path: '/callback',
    name: 'Callback',
    component: Callback
  }
]
