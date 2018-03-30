import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Home from '@/pages/Home'
import PaperSearch from '@/pages/PaperSearch'
import MyPaper from '@/pages/MyPaper'
import MyAnnotation from '@/pages/MyAnnotation'
import MyCollection from '@/pages/MyCollection'
import PaperCreate from '@/pages/PaperCreate'
import PaperUnreviewed from '@/pages/PaperUnreviewed'
import PaperReviewing from '@/pages/PaperReviewing'
import PaperReviewed from '@/pages/PaperReviewed'
import FileCreate from '@/pages/FileCreate'
import PDFShow from '@/components/PDFShow'
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/pdf',
      name: 'PDFShow',
      component: PDFShow
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/collection',
          name: 'myCollection',
          component: MyCollection
        },
        {
          path: '/annotation',
          name: 'myAnnotation',
          component: MyAnnotation
        },
        {
          path: '/paper/create',
          name: 'paperCreate',
          component: PaperCreate
        },
        {
          path: '/paper/search',
          name: 'paperSearch',
          component: PaperSearch
          
        },
        {
          path: '/paper',
          name: 'myPaper',
          component: MyPaper
        },
        {
          path: '/paper/unreviewed',
          name: 'paperUnreviewed',
          component: PaperUnreviewed
        },
        {
          path: '/paper/reviewing',
          name: 'paperReviewing',
          component: PaperReviewing
        },
        {
          path: '/paper/reviewed',
          name: 'paperReviewed',
          component: PaperReviewed
        },
        {
          path: '/file/create',
          name: 'fileCreate',
          component: FileCreate
        }
      ]
    },
  ]
})
