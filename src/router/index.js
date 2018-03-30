import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/pages/Login'
import Register from '@/components/pages/Register'
import Home from '@/components/pages/Home'
import Search from '@/components/pages/Search'
import MyPaper from '@/components/pages/MyPaper'
import AddPaper from '@/components/pages/AddPaper'
import UnReviewed from '@/components/pages/UnReviewed'
import AddFile from '@/components/pages/AddFile'
import ShowPDF from '@/components/components/ShowPDF'
import Reviewing from '@/components/pages/Reviewing'
import PaperList from '@/components/components/PaperList'
import myAnnotation from '@/components/pages/myAnnotation'
import myCollection from '@/components/pages/myCollection'
import Reviewed from '@/components/pages/Reviewed'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/showpdf',
      name: 'showpdf',
      component: ShowPDF
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/mycollection',
          name: 'mycollection',
          component: myCollection
        },
        {
          path: '/myannotation',
          name: 'myannotation',
          component: myAnnotation
        },
        {
          path: '/addpaper',
          name: 'addpaper',
          component: AddPaper
        },
        
        {
          path: '/paperlist',
          name: 'paperlist',
          component: PaperList
        },
        {
          path: '/search',
          name: 'search',
          component: Search
          
        },
        {
          path: '/mypaper',
          name: 'mypaper',
          component: MyPaper
        },
        {
          path: '/unreviewed',
          name: 'unreviewed',
          component: UnReviewed
        },
        {
          path: '/reviewing',
          name: 'reviewing',
          component: Reviewing
        },
        {
          path: '/reviewed',
          name: 'reviewed',
          component: Reviewed
        },
        {
          path: '/addfile',
          name: 'addfile',
          component: AddFile
        }
      ]
      
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  
  ]
})
