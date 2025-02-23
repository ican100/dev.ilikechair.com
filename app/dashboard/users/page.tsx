import { Text } from '@radix-ui/themes'
import { CloudUpload, FolderPlus } from 'lucide-react'
import { SiPandora } from 'react-icons/si'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'

import { Button } from '@components/ui/button'
import { Separator } from '@components/ui/separator'

const Page = () => {
  return (
    <>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <div className='space-y-0.5 flex justify-between items-center'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>用户列表</h2>
            <p className='text-muted-foreground'>Manage your account settings and set e-mail preferences.</p>
          </div>
          <div className='space-x-1.5'>
            <Button color='primary' size='sm'>
              <CloudUpload />
              <Text>上传图片</Text>
            </Button>
            <Button variant='outline' size='sm'>
              <FolderPlus />
              <Text>创建分组</Text>
            </Button>
          </div>
        </div>
        <Separator />

        <div className='flex items-center justify-between'>
          <div className='flex flex-1 items-center space-x-2'>
            <input
              className='flex rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm h-8 w-[150px] lg:w-[250px]'
              placeholder='Filter tasks...'
              value=''
            />
            <button
              className='inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground rounded-md px-3 text-xs h-8 border-dashed'
              type='button'
              aria-haspopup='dialog'
              aria-expanded='false'
              aria-controls='radix-:r3qf:'
              data-state='closed'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                stroke-width='2'
                stroke-linecap='round'
                stroke-linejoin='round'
                className='lucide lucide-circle-plus '
              >
                <circle cx='12' cy='12' r='10'></circle>
                <path d='M8 12h8'></path>
                <path d='M12 8v8'></path>
              </svg>
              Status
            </button>
            <button
              className='inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground rounded-md px-3 text-xs h-8 border-dashed'
              type='button'
              aria-haspopup='dialog'
              aria-expanded='false'
              aria-controls='radix-:r3qg:'
              data-state='closed'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                stroke-width='2'
                stroke-linecap='round'
                stroke-linejoin='round'
                className='lucide lucide-circle-plus '
              >
                <circle cx='12' cy='12' r='10'></circle>
                <path d='M8 12h8'></path>
                <path d='M12 8v8'></path>
              </svg>
              Priority
            </button>
          </div>
          <button
            className='items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground rounded-md px-3 text-xs ml-auto hidden h-8 lg:flex'
            type='button'
            aria-haspopup='menu'
            aria-expanded='false'
            data-state='closed'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
              className='lucide lucide-settings2 '
            >
              <path d='M20 7h-9'></path>
              <path d='M14 17H5'></path>
              <circle cx='17' cy='17' r='3'></circle>
              <circle cx='7' cy='7' r='3'></circle>
            </svg>
            View
          </button>
        </div>

        <div className='space-y-4 lg:space-y-0'>
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
            <div className='rounded-xl border bg-card text-card-foreground'>
              <div className='p-6 flex flex-row items-center justify-between space-y-0 pb-2'>
                <div className='tracking-tight text-sm font-medium'>Total Revenue</div>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  className='h-4 w-4 text-muted-foreground'
                >
                  <path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6'></path>
                </svg>
              </div>
              <div className='p-6 pt-0'>
                <div className='text-2xl font-bold'>$45,231.89</div>
                <p className='text-xs text-muted-foreground'>+20.1% from last month</p>
              </div>
            </div>
            <div className='rounded-xl border bg-card text-card-foreground'>
              <div className='p-6 flex flex-row items-center justify-between space-y-0 pb-2'>
                <div className='tracking-tight text-sm font-medium'>Subscriptions</div>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  className='h-4 w-4 text-muted-foreground'
                >
                  <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2'></path>
                  <circle cx='9' cy='7' r='4'></circle>
                  <path d='M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75'></path>
                </svg>
              </div>
              <div className='p-6 pt-0'>
                <div className='text-2xl font-bold'>+2350</div>
                <p className='text-xs text-muted-foreground'>+180.1% from last month</p>
              </div>
            </div>
            <div className='rounded-xl border bg-card text-card-foreground'>
              <div className='p-6 flex flex-row items-center justify-between space-y-0 pb-2'>
                <div className='tracking-tight text-sm font-medium'>Sales</div>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  className='h-4 w-4 text-muted-foreground'
                >
                  <rect width='20' height='14' x='2' y='5' rx='2'></rect>
                  <path d='M2 10h20'></path>
                </svg>
              </div>
              <div className='p-6 pt-0'>
                <div className='text-2xl font-bold'>+12,234</div>
                <p className='text-xs text-muted-foreground'>+19% from last month</p>
              </div>
            </div>
            <div className='rounded-xl border bg-card text-card-foreground'>
              <div className='p-6 flex flex-row items-center justify-between space-y-0 pb-2'>
                <div className='tracking-tight text-sm font-medium'>Active Now</div>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  className='h-4 w-4 text-muted-foreground'
                >
                  <path d='M22 12h-4l-3 9L9 3l-3 9H2'></path>
                </svg>
              </div>
              <div className='p-6 pt-0'>
                <div className='text-2xl font-bold'>+573</div>
                <p className='text-xs text-muted-foreground'>+201 since last hour</p>
              </div>
            </div>
          </div>
          <div className='min-h-[600px]'>
            <button className='flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent mt-5'>
              <div className='flex w-full flex-col gap-1'>
                <div className='flex items-center'>
                  <div className='flex items-center gap-2'>
                    <div className='font-semibold'>William Smith</div>
                  </div>
                  <div className='ml-auto text-xs text-muted-foreground'>about 1 year ago</div>
                </div>
                <div className='text-xs font-medium'>Meeting Tomorrow</div>
              </div>
              <div className='line-clamp-2 text-xs text-muted-foreground'>
                Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and
                have some ideas I'd like to share. It's crucial that we align on our next steps to ensure the project's
                success. Please come prepared with any questions or insights you may have. Looking forward to
              </div>
              <div className='flex items-center gap-2'>
                <div className='inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80'>
                  meeting
                </div>
                <div className='inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80'>
                  work
                </div>
                <div className='inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80'>
                  important
                </div>
              </div>
            </button>
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href='#' />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href='#'>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href='#' isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href='#'>3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href='#' />
              </PaginationItem>
            </PaginationContent>
          </Pagination>

          <div className='flex items-center justify-between px-2'>
            <div className='flex-1 text-sm text-muted-foreground'>0 of 100 row(s) selected.</div>
            <div className='flex items-center space-x-6 lg:space-x-8'>
              <div className='flex items-center space-x-2'>
                <p className='text-sm font-medium'>Rows per page</p>
                <button
                  type='button'
                  role='combobox'
                  aria-controls='radix-:r3rd:'
                  aria-expanded='false'
                  aria-autocomplete='none'
                  dir='ltr'
                  data-state='closed'
                  className='flex items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&amp;>span]:line-clamp-1 h-8 w-[70px]'
                >
                  <span>10</span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    className='lucide lucide-chevron-down h-4 w-4 opacity-50'
                    aria-hidden='true'
                  >
                    <path d='m6 9 6 6 6-6'></path>
                  </svg>
                </button>
              </div>
              <div className='flex w-[100px] items-center justify-center text-sm font-medium'>Page 1 of 10</div>
              <div className='flex items-center space-x-2'>
                <button className='items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground hidden h-8 w-8 p-0 lg:flex'>
                  <span className='sr-only'>Go to first page</span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    className='lucide lucide-chevrons-left '
                  >
                    <path d='m11 17-5-5 5-5'></path>
                    <path d='m18 17-5-5 5-5'></path>
                  </svg>
                </button>
                <button className='inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0'>
                  <span className='sr-only'>Go to previous page</span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    className='lucide lucide-chevron-left '
                  >
                    <path d='m15 18-6-6 6-6'></path>
                  </svg>
                </button>
                <button className='inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0'>
                  <span className='sr-only'>Go to next page</span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    className='lucide lucide-chevron-right '
                  >
                    <path d='m9 18 6-6-6-6'></path>
                  </svg>
                </button>
                <button className='items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground hidden h-8 w-8 p-0 lg:flex'>
                  <span className='sr-only'>Go to last page</span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    className='lucide lucide-chevrons-right '
                  >
                    <path d='m6 17 5-5-5-5'></path>
                    <path d='m13 17 5-5-5-5'></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='grid h-full items-stretch gap-6 md:grid-cols-[1fr_200px]'>
        <div className='hidden flex-col space-y-4 sm:flex md:order-2'>
          <div className='grid gap-2'>
            <span
              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              data-state='closed'
            >
              Mode
            </span>
            <div
              role='tablist'
              aria-orientation='horizontal'
              className='h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground grid grid-cols-3'
            >
              <button
                type='button'
                role='tab'
                aria-selected='true'
                aria-controls='radix-:r3vl:-content-complete'
                data-state='active'
                id='radix-:r3vl:-trigger-complete'
                className='inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow'
                data-orientation='horizontal'
                data-radix-collection-item=''
              >
                <span className='sr-only'>Complete</span>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none' className='h-5 w-5'>
                  <rect x='4' y='3' width='12' height='2' rx='1' fill='currentColor'></rect>
                  <rect x='4' y='7' width='12' height='2' rx='1' fill='currentColor'></rect>
                  <rect x='4' y='11' width='3' height='2' rx='1' fill='currentColor'></rect>
                  <rect x='4' y='15' width='3' height='2' rx='1' fill='currentColor'></rect>
                  <rect x='8.5' y='11' width='3' height='2' rx='1' fill='currentColor'></rect>
                  <rect x='8.5' y='15' width='3' height='2' rx='1' fill='currentColor'></rect>
                  <rect x='13' y='11' width='3' height='2' rx='1' fill='currentColor'></rect>
                </svg>
              </button>
              <button
                type='button'
                role='tab'
                aria-selected='false'
                aria-controls='radix-:r3vl:-content-insert'
                data-state='inactive'
                id='radix-:r3vl:-trigger-insert'
                className='inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow'
              >
                <span className='sr-only'>Insert</span>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none' className='h-5 w-5'>
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M14.491 7.769a.888.888 0 0 1 .287.648.888.888 0 0 1-.287.648l-3.916 3.667a1.013 1.013 0 0 1-.692.268c-.26 0-.509-.097-.692-.268L5.275 9.065A.886.886 0 0 1 5 8.42a.889.889 0 0 1 .287-.64c.181-.17.427-.267.683-.269.257-.002.504.09.69.258L8.903 9.87V3.917c0-.243.103-.477.287-.649.183-.171.432-.268.692-.268.26 0 .509.097.692.268a.888.888 0 0 1 .287.649V9.87l2.245-2.102c.183-.172.432-.269.692-.269.26 0 .508.097.692.269Z'
                    fill='currentColor'
                  ></path>
                  <rect x='4' y='15' width='3' height='2' rx='1' fill='currentColor'></rect>
                  <rect x='8.5' y='15' width='3' height='2' rx='1' fill='currentColor'></rect>
                  <rect x='13' y='15' width='3' height='2' rx='1' fill='currentColor'></rect>
                </svg>
              </button>
              <button
                type='button'
                role='tab'
                aria-selected='false'
                aria-controls='radix-:r3vl:-content-edit'
                data-state='inactive'
                id='radix-:r3vl:-trigger-edit'
                className='inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow'
              >
                <span className='sr-only'>Edit</span>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none' className='h-5 w-5'>
                  <rect x='4' y='3' width='12' height='2' rx='1' fill='currentColor'></rect>
                  <rect x='4' y='7' width='12' height='2' rx='1' fill='currentColor'></rect>
                  <rect x='4' y='11' width='3' height='2' rx='1' fill='currentColor'></rect>
                  <rect x='4' y='15' width='4' height='2' rx='1' fill='currentColor'></rect>
                  <rect x='8.5' y='11' width='3' height='2' rx='1' fill='currentColor'></rect>
                  <path
                    d='M17.154 11.346a1.182 1.182 0 0 0-1.671 0L11 15.829V17.5h1.671l4.483-4.483a1.182 1.182 0 0 0 0-1.671Z'
                    fill='currentColor'
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          <div className='grid gap-2'>
            <label
              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              data-state='closed'
            >
              Model
            </label>
            <button
              className='inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-full justify-between'
              role='combobox'
              aria-expanded='false'
              aria-label='Select a model'
              type='button'
              aria-haspopup='dialog'
              aria-controls='radix-:r3vp:'
              data-state='closed'
            >
              text-davinci-003
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                stroke-width='2'
                stroke-linecap='round'
                stroke-linejoin='round'
                className='lucide lucide-chevrons-up-down opacity-50'
              >
                <path d='m7 15 5 5 5-5'></path>
                <path d='m7 9 5-5 5 5'></path>
              </svg>
            </button>
          </div>
          <div className='grid gap-2 pt-2'>
            <div className='grid gap-4' data-state='closed'>
              <div className='flex items-center justify-between'>
                <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                  Temperature
                </label>
                <span className='w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border'>
                  0.56
                </span>
              </div>
              <span
                dir='ltr'
                data-orientation='horizontal'
                aria-disabled='false'
                className='relative flex w-full touch-none select-none items-center [&amp;_[role=slider]]:h-4 [&amp;_[role=slider]]:w-4'
                id='temperature'
              >
                <span
                  data-orientation='horizontal'
                  className='relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20'
                >
                  <span
                    data-orientation='horizontal'
                    className='absolute h-full bg-primary'
                    style={{ left: '0%', right: '44%' }}
                  ></span>
                </span>
                <span
                  style={{
                    transform: 'var(--radix-slider-thumb-transform)',
                    position: 'absolute',
                    left: 'calc(56% - 0.96px)'
                  }}
                >
                  X
                </span>
              </span>
            </div>
          </div>
          <div className='grid gap-2 pt-2'>
            <div className='grid gap-4' data-state='closed'>
              <div className='flex items-center justify-between'>
                <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                  Maximum Length
                </label>
                <span className='w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border'>
                  256
                </span>
              </div>
              <span
                dir='ltr'
                data-orientation='horizontal'
                aria-disabled='false'
                className='relative flex w-full touch-none select-none items-center [&amp;_[role=slider]]:h-4 [&amp;_[role=slider]]:w-4'
                id='maxlength'
                aria-label='Maximum Length'
              >
                <span
                  data-orientation='horizontal'
                  className='relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20'
                >
                  <span data-orientation='horizontal' className='absolute h-full bg-primary'></span>
                </span>
                <span>X</span>
              </span>
            </div>
          </div>
          <div className='grid gap-2 pt-2'>
            <div className='grid gap-4' data-state='closed'>
              <div className='flex items-center justify-between'>
                <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                  Top P
                </label>
                <span className='w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border'>
                  0.9
                </span>
              </div>
              <span
                dir='ltr'
                data-orientation='horizontal'
                aria-disabled='false'
                className='relative flex w-full touch-none select-none items-center [&amp;_[role=slider]]:h-4 [&amp;_[role=slider]]:w-4'
                id='top-p'
                aria-label='Top P'
              >
                <span
                  data-orientation='horizontal'
                  className='relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20'
                >
                  <span data-orientation='horizontal' className='absolute h-full bg-primary'></span>
                </span>
                <SiPandora>X</SiPandora>
              </span>
            </div>
          </div>
        </div>
        <div className='md:order-1'>
          <div
            data-state='active'
            data-orientation='horizontal'
            role='tabpanel'
            aria-labelledby='radix-:r3vl:-trigger-complete'
            id='radix-:r3vl:-content-complete'
            className='ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mt-0 border-0 p-0'
          >
            <div className='flex h-full flex-col space-y-4'>
              <textarea
                className='flex w-full rounded-md border border-input bg-transparent text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm min-h-[400px] flex-1 p-4 md:min-h-[700px] lg:min-h-[700px]'
                placeholder='Write a tagline for an ice cream shop'
              ></textarea>
              <div className='flex items-center space-x-2'>
                <button className='inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2'>
                  Submit
                </button>
                <button className='inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-9 px-4 py-2'>
                  <span className='sr-only'>Show history</span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    className='lucide lucide-rotate-ccw '
                  >
                    <path d='M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8'></path>
                    <path d='M3 3v5h5'></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div
            data-state='inactive'
            data-orientation='horizontal'
            role='tabpanel'
            aria-labelledby='radix-:r3vl:-trigger-insert'
            id='radix-:r3vl:-content-insert'
            className='ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mt-0 border-0 p-0'
          ></div>
          <div
            data-state='inactive'
            data-orientation='horizontal'
            role='tabpanel'
            aria-labelledby='radix-:r3vl:-trigger-edit'
            id='radix-:r3vl:-content-edit'
            className='ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mt-0 border-0 p-0'
          ></div>
        </div>
      </div>
    </>
  )
}

export default Page
