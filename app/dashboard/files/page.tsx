'use client'

import { ServerError, useLazyQuery } from '@apollo/client'
import { ApolloError } from '@apollo/client/errors'
import { Text } from '@radix-ui/themes'
import { CloudUpload, FolderPlus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'

import { FileGroupDrawer } from '@components/app/files'
import { Button } from '@components/ui/button'
import { Separator } from '@components/ui/separator'
import { FileGroupsDocument } from '@generated/graphql'

import { API } from '/#/api'

const Page = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [open, setOpen] = useState(false)

  const [fetch, { data, error, refetch }] = useLazyQuery(FileGroupsDocument, {
    onError: ({ networkError }: ApolloError) => {
      const { result } = networkError as ServerError
      const { errors } = result as Record<string, { message: string }[]>
      toast.error(errors[0].message)
    }
  })

  console.log(loading)

  useEffect(() => {
    setLoading(true)
    fetch().then()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Handle error state
  useEffect(() => {
    if (error) {
      toast.error('An error occurred while fetching roles.')
    }
  }, [error])

  const [fileGroups, setFileGroups] = useState<API.FileGroup[]>([])
  useEffect(() => {
    if (data?.fileGroups) {
      setFileGroups(data.fileGroups as API.FileGroup[])
      setLoading(false)
    }
  }, [data])

  const [fileGroup, setFileGroup] = useState<API.FileGroup | null>(null)
  const onSelect = (item: API.FileGroup | null) => {
    setFileGroup(item)
    setOpen(true)
  }
  return (
    <>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <div className='bg-background'>
          <div className='grid lg:grid-cols-5'>
            <div className='pb-12 hidden lg:block'>
              <div className='space-y-4 pb-4'>
                <div className='px-3 py-2'>
                  <div className='flex justify-end mb-3'>
                    <Button variant='outline' className='shadow-none' size='sm' onClick={() => onSelect(null)}>
                      <FolderPlus />
                      <Text>创建分组</Text>
                    </Button>
                  </div>
                  <Separator />
                  <h2 className='my-2 px-4 text-lg font-bold tracking-tight'>所有图片</h2>
                  <div className='space-y-1'>
                    <button className='inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-9 px-4 py-2 w-full justify-start'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        stroke-width='2'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        className='mr-2 h-4 w-4'
                      >
                        <circle cx='12' cy='12' r='10'></circle>
                        <polygon points='10 8 16 12 10 16 10 8'></polygon>
                      </svg>
                      Listen Now
                    </button>
                    {fileGroups.map(fileGroup => (
                      <button
                        key={fileGroup.id}
                        className='inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-full justify-start'
                        onClick={() => onSelect(fileGroup)}
                      >
                        {fileGroup.group_name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className='col-span-3 lg:col-span-4 lg:border-l'>
              <div className='h-full px-4 py-6 lg:px-6'>
                <div dir='ltr' data-orientation='horizontal' className='h-full space-y-6'>
                  <div className='space-between flex items-center'>
                    <div
                      role='tablist'
                      aria-orientation='horizontal'
                      className='inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground'
                      data-orientation='horizontal'
                    >
                      <button
                        type='button'
                        role='tab'
                        aria-selected='true'
                        aria-controls='radix-:r3tm:-content-music'
                        data-state='active'
                        id='radix-:r3tm:-trigger-music'
                        className='inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow relative'
                        data-orientation='horizontal'
                        data-radix-collection-item=''
                      >
                        Music
                      </button>
                      <button
                        type='button'
                        role='tab'
                        aria-selected='false'
                        aria-controls='radix-:r3tm:-content-podcasts'
                        data-state='inactive'
                        id='radix-:r3tm:-trigger-podcasts'
                        className='inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow'
                        data-orientation='horizontal'
                        data-radix-collection-item=''
                      >
                        Podcasts
                      </button>
                      <button
                        type='button'
                        role='tab'
                        aria-selected='false'
                        aria-controls='radix-:r3tm:-content-live'
                        data-state='inactive'
                        data-disabled=''
                        id='radix-:r3tm:-trigger-live'
                        className='inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow'
                        data-orientation='horizontal'
                        data-radix-collection-item=''
                      >
                        Live
                      </button>
                    </div>
                    <div className='ml-auto'>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button color='primary' size='sm'>
                            <CloudUpload />
                            <Text>上传图片</Text>
                          </Button>
                        </DialogTrigger>
                        <DialogContent className='sm:max-w-[425px]'>
                          <DialogHeader>
                            <DialogTitle>Edit profile</DialogTitle>
                            <DialogDescription>
                              Make changes to your profile here. Click save when you're done.
                            </DialogDescription>
                          </DialogHeader>
                          <div className='grid gap-4 py-4'>
                            <div className='grid grid-cols-4 items-center gap-4'>
                              <Label htmlFor='name' className='text-right'>
                                Name
                              </Label>
                              <Input id='name' value='Pedro Duarte' className='col-span-3' />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                              <Label htmlFor='username' className='text-right'>
                                Username
                              </Label>
                              <Input id='username' value='@peduarte' className='col-span-3' />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type='submit'>Save changes</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                  <div
                    data-state='active'
                    data-orientation='horizontal'
                    role='tabpanel'
                    aria-labelledby='radix-:r3tm:-trigger-music'
                    id='radix-:r3tm:-content-music'
                    className='mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border-none p-0 outline-none'
                  >
                    <div className='flex items-center justify-between'>
                      <div className='space-y-1'>
                        <h2 className='text-2xl font-semibold tracking-tight'>Listen Now</h2>
                        <p className='text-sm text-muted-foreground'>Top picks for you. Updated daily.</p>
                      </div>
                      <Button variant='outline' className='shadow-none' size='sm' onClick={() => onSelect(null)}>
                        <FolderPlus />
                        <Text>编辑分组</Text>
                      </Button>
                    </div>
                    <div
                      data-orientation='horizontal'
                      role='none'
                      className='shrink-0 bg-border h-[1px] w-full my-4'
                    ></div>
                    <div className='relative'>
                      <div dir='ltr' className='relative overflow-hidden'>
                        <div data-radix-scroll-area-viewport='' className='h-full w-full rounded-[inherit]'>
                          <div>
                            <div className='flex space-x-4 pb-4'>
                              <div className='space-y-3 w-[250px]'>
                                <span data-state='closed'>
                                  <div className='overflow-hidden rounded-md'>
                                    <img
                                      alt='React Rendezvous'
                                      loading='lazy'
                                      width='250'
                                      height='330'
                                      decoding='async'
                                      data-nimg='1'
                                      className='h-auto w-auto object-cover transition-all hover:scale-105 aspect-[3/4]'
                                      src='https://ui.shadcn.com/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1611348586804-61bf6c080437%3Fw%3D300%26dpr%3D2%26q%3D80&w=640&q=75'
                                    />
                                  </div>
                                </span>
                                <div className='space-y-1 text-sm'>
                                  <h3 className='font-medium leading-none'>React Rendezvous</h3>
                                  <p className='text-xs text-muted-foreground'>Ethan Byte</p>
                                </div>
                              </div>
                              <div className='space-y-3 w-[250px]'>
                                <span data-state='closed'>
                                  <div className='overflow-hidden rounded-md'>
                                    <img
                                      alt='Async Awakenings'
                                      loading='lazy'
                                      width='250'
                                      height='330'
                                      decoding='async'
                                      data-nimg='1'
                                      className='h-auto w-auto object-cover transition-all hover:scale-105 aspect-[3/4]'
                                      src='https://ui.shadcn.com/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1611348586804-61bf6c080437%3Fw%3D300%26dpr%3D2%26q%3D80&w=640&q=75'
                                    />
                                  </div>
                                </span>
                                <div className='space-y-1 text-sm'>
                                  <h3 className='font-medium leading-none'>Async Awakenings</h3>
                                  <p className='text-xs text-muted-foreground'>Nina Netcode</p>
                                </div>
                              </div>
                              <div className='space-y-3 w-[250px]'>
                                <span data-state='closed'>
                                  <div className='overflow-hidden rounded-md'>
                                    <img
                                      alt='The Art of Reusability'
                                      loading='lazy'
                                      width='250'
                                      height='330'
                                      decoding='async'
                                      data-nimg='1'
                                      className='h-auto w-auto object-cover transition-all hover:scale-105 aspect-[3/4]'
                                      src='https://ui.shadcn.com/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1611348586804-61bf6c080437%3Fw%3D300%26dpr%3D2%26q%3D80&w=640&q=75'
                                    />
                                  </div>
                                </span>
                                <div className='space-y-1 text-sm'>
                                  <h3 className='font-medium leading-none'>The Art of Reusability</h3>
                                  <p className='text-xs text-muted-foreground'>Lena Logic</p>
                                </div>
                              </div>
                              <div className='space-y-3 w-[250px]'>
                                <span data-state='closed'>
                                  <div className='overflow-hidden rounded-md'>
                                    <img
                                      alt='Stateful Symphony'
                                      loading='lazy'
                                      width='250'
                                      height='330'
                                      decoding='async'
                                      data-nimg='1'
                                      className='h-auto w-auto object-cover transition-all hover:scale-105 aspect-[3/4]'
                                      src='https://ui.shadcn.com/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1611348586804-61bf6c080437%3Fw%3D300%26dpr%3D2%26q%3D80&w=640&q=75'
                                    />
                                  </div>
                                </span>
                                <div className='space-y-1 text-sm'>
                                  <h3 className='font-medium leading-none'>Stateful Symphony</h3>
                                  <p className='text-xs text-muted-foreground'>Beth Binary</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='mt-6 space-y-1'>
                      <h2 className='text-2xl font-semibold tracking-tight'>Made for You</h2>
                      <p className='text-sm text-muted-foreground'>Your personal playlists. Updated daily.</p>
                    </div>
                    <div
                      data-orientation='horizontal'
                      role='none'
                      className='shrink-0 bg-border h-[1px] w-full my-4'
                    ></div>
                    <div className='relative'>
                      <div dir='ltr' className='relative overflow-hidden'>
                        <div data-radix-scroll-area-viewport='' className='h-full w-full rounded-[inherit]'>
                          <div>
                            <div className='flex space-x-4 pb-4'>
                              <div className='space-y-3 w-[150px]'>
                                <span data-state='closed'>
                                  <div className='overflow-hidden rounded-md'>
                                    <img
                                      alt='Thinking Components'
                                      loading='lazy'
                                      width='150'
                                      height='150'
                                      decoding='async'
                                      data-nimg='1'
                                      className='h-auto w-auto object-cover transition-all hover:scale-105 aspect-square'
                                      src='https://ui.shadcn.com/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1611348586804-61bf6c080437%3Fw%3D300%26dpr%3D2%26q%3D80&w=640&q=75'
                                    />
                                  </div>
                                </span>
                                <div className='space-y-1 text-sm'>
                                  <h3 className='font-medium leading-none'>Thinking Components</h3>
                                  <p className='text-xs text-muted-foreground'>Lena Logic</p>
                                </div>
                              </div>
                              <div className='space-y-3 w-[150px]'>
                                <span data-state='closed'>
                                  <div className='overflow-hidden rounded-md'>
                                    <img
                                      alt='Functional Fury'
                                      loading='lazy'
                                      width='150'
                                      height='150'
                                      decoding='async'
                                      data-nimg='1'
                                      className='h-auto w-auto object-cover transition-all hover:scale-105 aspect-square'
                                      src='https://ui.shadcn.com/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1611348586804-61bf6c080437%3Fw%3D300%26dpr%3D2%26q%3D80&w=640&q=75'
                                    />
                                  </div>
                                </span>
                                <div className='space-y-1 text-sm'>
                                  <h3 className='font-medium leading-none'>Functional Fury</h3>
                                  <p className='text-xs text-muted-foreground'>Beth Binary</p>
                                </div>
                              </div>
                              <div className='space-y-3 w-[150px]'>
                                <span data-state='closed'>
                                  <div className='overflow-hidden rounded-md'>
                                    <img
                                      alt='React Rendezvous'
                                      loading='lazy'
                                      width='150'
                                      height='150'
                                      decoding='async'
                                      data-nimg='1'
                                      className='h-auto w-auto object-cover transition-all hover:scale-105 aspect-square'
                                      src='https://ui.shadcn.com/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1611348586804-61bf6c080437%3Fw%3D300%26dpr%3D2%26q%3D80&w=640&q=75'
                                    />
                                  </div>
                                </span>
                                <div className='space-y-1 text-sm'>
                                  <h3 className='font-medium leading-none'>React Rendezvous</h3>
                                  <p className='text-xs text-muted-foreground'>Ethan Byte</p>
                                </div>
                              </div>
                              <div className='space-y-3 w-[150px]'>
                                <span data-state='closed'>
                                  <div className='overflow-hidden rounded-md'>
                                    <img
                                      alt='Stateful Symphony'
                                      loading='lazy'
                                      width='150'
                                      height='150'
                                      decoding='async'
                                      data-nimg='1'
                                      className='h-auto w-auto object-cover transition-all hover:scale-105 aspect-square'
                                      src='https://ui.shadcn.com/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1611348586804-61bf6c080437%3Fw%3D300%26dpr%3D2%26q%3D80&w=640&q=75'
                                    />
                                  </div>
                                </span>
                                <div className='space-y-1 text-sm'>
                                  <h3 className='font-medium leading-none'>Stateful Symphony</h3>
                                  <p className='text-xs text-muted-foreground'>Beth Binary</p>
                                </div>
                              </div>
                              <div className='space-y-3 w-[150px]'>
                                <span data-state='closed'>
                                  <div className='overflow-hidden rounded-md'>
                                    <img
                                      alt='Async Awakenings'
                                      loading='lazy'
                                      width='150'
                                      height='150'
                                      decoding='async'
                                      data-nimg='1'
                                      className='h-auto w-auto object-cover transition-all hover:scale-105 aspect-square'
                                      src='https://ui.shadcn.com/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1611348586804-61bf6c080437%3Fw%3D300%26dpr%3D2%26q%3D80&w=640&q=75'
                                    />
                                  </div>
                                </span>
                                <div className='space-y-1 text-sm'>
                                  <h3 className='font-medium leading-none'>Async Awakenings</h3>
                                  <p className='text-xs text-muted-foreground'>Nina Netcode</p>
                                </div>
                              </div>
                              <div className='space-y-3 w-[150px]'>
                                <span data-state='closed'>
                                  <div className='overflow-hidden rounded-md'>
                                    <img
                                      alt='The Art of Reusability'
                                      loading='lazy'
                                      width='150'
                                      height='150'
                                      decoding='async'
                                      data-nimg='1'
                                      className='h-auto w-auto object-cover transition-all hover:scale-105 aspect-square'
                                      src='https://ui.shadcn.com/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1611348586804-61bf6c080437%3Fw%3D300%26dpr%3D2%26q%3D80&w=640&q=75'
                                    />
                                  </div>
                                </span>
                                <div className='space-y-1 text-sm'>
                                  <h3 className='font-medium leading-none'>The Art of Reusability</h3>
                                  <p className='text-xs text-muted-foreground'>Lena Logic</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    data-state='inactive'
                    data-orientation='horizontal'
                    role='tabpanel'
                    aria-labelledby='radix-:r3tm:-trigger-podcasts'
                    id='radix-:r3tm:-content-podcasts'
                    className='mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-full flex-col border-none p-0 data-[state=active]:flex'
                  ></div>
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
              </div>
            </div>
          </div>
        </div>
      </div>

      <FileGroupDrawer open={open} setOpen={setOpen} fileGroup={fileGroup} refetch={refetch} fileGroups={fileGroups} />
    </>
  )
}

export default Page
