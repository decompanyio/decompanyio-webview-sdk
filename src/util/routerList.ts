import Upload from '../components/body/upload/Upload'
import Login from '../components/body/auth/Login'
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
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/callback',
    name: 'Callback',
    component: Callback
  }
]
