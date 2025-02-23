'use client'

import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal
} from 'lucide-react'
import * as React from 'react'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import { NavMain } from '@components/app/common/nav-main'
import { NavProjects } from '@components/app/common/nav-projects'
import { NavUser } from '@components/app/common/nav-user'
import { TeamSwitcher } from '@components/app/common/team-switcher'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@components/ui/sidebar'
// This is sample data.
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg'
  },
  teams: [
    {
      name: '九型人格',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise'
    },
    {
      name: '玛雅天赋',
      logo: AudioWaveform,
      plan: 'Startup'
    },
    {
      name: '王者天赋',
      logo: Command,
      plan: 'Free'
    }
  ],
  navMain: [
    {
      title: '用户管理',
      url: '#',
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: '用户列表',
          url: '/dashboard/users'
        },
        {
          title: '推荐人',
          url: '/dashboard/users?r=referrer'
        },
        {
          title: '咨询师',
          url: '/dashboard/users?r=counselor'
        }
      ]
    },
    {
      title: '菜单管理',
      url: '#',
      icon: Bot,
      items: [
        {
          title: '菜单列表',
          url: '/dashboard/menus'
        }
      ]
    },
    {
      title: '角色权限',
      url: '#',
      icon: Bot,
      items: [
        {
          title: '角色列表',
          url: '/dashboard/roles'
        },
        {
          title: '权限列表',
          url: '/dashboard/permissions'
        }
      ]
    },
    {
      title: '积分管理',
      url: '#',
      icon: Bot,
      items: [
        {
          title: '咨询师',
          url: '#'
        },
        {
          title: '积分管理',
          url: '#'
        }
      ]
    },
    {
      title: '课程管理',
      url: '#',
      icon: Bot,
      items: [
        {
          title: '课程列表',
          url: '#'
        },
        {
          title: '课程类别',
          url: '#'
        }
      ]
    },
    {
      title: '系统设置',
      url: '#',
      icon: Bot,
      items: [
        {
          title: '系统参数',
          url: '/dashboard/settings'
        },
        {
          title: '图片银行',
          url: '/dashboard/files'
        },
        {
          title: '系统列表',
          url: '/dashboard/cores'
        },
        {
          title: '公众号',
          url: '/dashboard/accounts'
        }
      ]
    },
    {
      title: '订单中心',
      url: '#',
      icon: Bot,
      items: [
        {
          title: '课程列表',
          url: '#'
        },
        {
          title: '课程类别',
          url: '#'
        }
      ]
    },
    {
      title: '文章管理',
      url: '#',
      icon: BookOpen,
      items: [
        {
          title: 'Introduction',
          url: '#'
        },
        {
          title: 'Get Started',
          url: '#'
        },
        {
          title: 'Tutorials',
          url: '#'
        },
        {
          title: 'Changelog',
          url: '#'
        }
      ]
    },
    {
      title: '栏目管理',
      url: '#',
      icon: Settings2,
      items: [
        {
          title: 'General',
          url: '#'
        },
        {
          title: 'Team',
          url: '#'
        },
        {
          title: 'Billing',
          url: '#'
        },
        {
          title: 'Limits',
          url: '#'
        }
      ]
    }
  ],
  projects: [
    {
      name: 'Design Engineering',
      url: '#',
      icon: Frame
    },
    {
      name: 'Sales & Marketing',
      url: '#',
      icon: PieChart
    },
    {
      name: 'Travel',
      url: '#',
      icon: Map
    }
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
