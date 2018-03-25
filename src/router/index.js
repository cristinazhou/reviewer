import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Layout2 from '@/components/paper/Layout2'
import Search from '@/components/main-component/Search'
import MyPaper from '@/components/main-component/MyPaper'
import AddPaper from '@/components/main-component/AddPaper'
import UnReviewer from '@/components/main-component/UnReviewer'
import AddFile from '@/components/main-component/AddFile'
import ShowPDF from '@/components/main-component/ShowPDF'
import Reviewering from '@/components/main-component/Reviewering'
import PaperList from '@/components/main-component/PaperList'


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
      path: '/layout2',
      name: 'layout2',
      component: Layout2,
      children: [
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
          path: '/reviewering',
          name: 'reviewering',
          component: Reviewering
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
          path: '/unreviewer',
          name: 'unreviewer',
          component: UnReviewer
        },
        {
          path:'/addfile',
          name:'addfile',
          component:AddFile
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
