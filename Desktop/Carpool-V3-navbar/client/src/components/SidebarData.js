import React from 'react'
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'
import { BiLogIn } from 'react-icons/bi'

export const SidebarData = [
  {
    title: 'Home',
    path: '/Home',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text',
  },
  {
    title: 'Authentification',
    path: '/Auth',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text',
  },
  {
    title: 'Login',
    path: '/Login',
    icon: <BiLogIn />,
    cName: 'nav-text',
  },
]
