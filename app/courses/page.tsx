import Link from 'next/link'

const Page = () => {
  return (
    <div>
      <div id='blog' className='bg-gray-50 px-4 xl:px-0 py-20'>
        <div className='mx-auto container'>
          <div className='flex flex-col items-center justify-center'>
            <h1 className='text-4xl font-semibold leading-9 text-center text-gray-800'>系统学习如何激发潜能</h1>
            <p className='text-base leading-normal text-center text-gray-600 mt-4 lg:w-1/2 md:w-10/12 w-11/12'>
              想要系统地学习如何发现、开发和运用自己的天赋？我们的专业课程涵盖了天赋识别、能力提升、职业规划等多个方面，助你一步步激发潜力，实现自我突破。
            </p>
          </div>
          <div className='mt-12 lg:mt-24'>
            <div className='grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8'>
              <div>
                <img
                  className='w-full'
                  src='https://cdn.tuk.dev/assets/components/111220/Blg-6/blog(1).png'
                  alt='computer'
                />
                <div className='py-4 px-8 w-full flex justify-between bg-indigo-700'>
                  <p className='text-sm text-white font-semibold tracking-wide'>Bruce Wayne</p>
                  <p className='text-sm text-white font-semibold tracking-wide'>13TH Oct, 2020</p>
                </div>
                <div className='bg-white px-10 py-6 rounded-bl-3xl rounded-br-3xl'>
                  <h1 className='text-4xl text-gray-900 font-semibold tracking-wider'>Transactions</h1>
                  <p className='text-gray-700 text-base lg:text-lg  lg:leading-8 tracking-wide mt-6 w-11/12'>
                    Find the latest events updates or create events, concerts, conferences, workshops, exhibitions, and
                    cultural events in all cities of the US. The aim of Eventistan is to promote healthy and
                    entertaining event.Find the latest events updates or create events, concerts, conferences,
                    workshops, exhibitions, and cultural events in all cities of the US. The aim of Eventistan is to
                    promote healthy and entertaining event.
                  </p>
                  <div className='w-full mt-4 justify-end flex items-center cursor-pointer'>
                    <Link href='/articles/1' className='text-base tracking-wide text-indigo-500'>
                      Read more
                    </Link>
                    <svg
                      className='ml-3 lg:ml-6'
                      xmlns='http://www.w3.org/2000/svg'
                      width={20}
                      height={18}
                      viewBox='0 0 20 18'
                      fill='none'
                    >
                      <path
                        d='M11.7998 1L18.9998 8.53662L11.7998 16.0732'
                        stroke='#4338ca'
                        strokeWidth={2}
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                      <path
                        d='M1 8.53662H19'
                        stroke='#4338ca'
                        strokeWidth={2}
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </div>
                  <div className='h-5 w-2' />
                </div>
              </div>
              <div>
                <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8'>
                  <div>
                    <img
                      className='w-full'
                      src='https://cdn.tuk.dev/assets/components/111220/Blg-6/blog(2).png'
                      alt='games'
                    />
                    <div className='py-2 px-4 w-full flex justify-between bg-indigo-700'>
                      <p className='text-sm text-white font-semibold tracking-wide'>Bruce Wayne</p>
                      <p className='text-sm text-white font-semibold tracking-wide'>13TH Oct, 2020</p>
                    </div>
                    <div className='bg-white px-3  lg:px-6 py-4 rounded-bl-3xl rounded-br-3xl'>
                      <h1 className='text-lg text-gray-900 font-semibold tracking-wider'>Transactions</h1>
                      <p className='text-gray-700 text-sm  lg:text-base  lg:leading-8 pr-4 tracking-wide mt-2'>
                        Find the latest events updates or create events, concerts, conferences, workshops...
                      </p>
                    </div>
                  </div>
                  <div>
                    <img
                      className='w-full'
                      src='https://cdn.tuk.dev/assets/components/111220/Blg-6/blog(3).png'
                      alt='notes'
                    />
                    <div className='py-2 px-4 w-full flex justify-between bg-indigo-700'>
                      <p className='text-sm text-white font-semibold tracking-wide'>Bruce Wayne</p>
                      <p className='text-sm text-white font-semibold tracking-wide'>13TH Oct, 2020</p>
                    </div>
                    <div className='bg-white px-3  lg:px-6 py-4 rounded-bl-3xl rounded-br-3xl'>
                      <h1 className='text-lg text-gray-900 font-semibold tracking-wider'>Transactions</h1>
                      <p className='text-gray-700 text-sm  lg:text-base  lg:leading-8 pr-4 tracking-wide mt-2'>
                        Find the latest events updates or create events, concerts, conferences, workshops...
                      </p>
                    </div>
                  </div>
                </div>
                <div className='mt-10 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8'>
                  <div>
                    <img
                      className='w-full'
                      src='https://cdn.tuk.dev/assets/components/111220/Blg-6/blog(4).png'
                      alt='laptop'
                    />
                    <div className='py-2 px-4 w-full flex justify-between bg-indigo-700'>
                      <p className='text-sm text-white font-semibold tracking-wide'>Bruce Wayne</p>
                      <p className='text-sm text-white font-semibold tracking-wide'>13TH Oct, 2020</p>
                    </div>
                    <div className='bg-white px-3  lg:px-6 py-4 rounded-bl-3xl rounded-br-3xl'>
                      <h1 className='text-lg text-gray-900 font-semibold tracking-wider'>Transactions</h1>
                      <p className='text-gray-700 text-sm  lg:text-base  lg:leading-8 pr-4 tracking-wide mt-2'>
                        Find the latest events updates or create events, concerts, conferences, workshops...
                      </p>
                    </div>
                  </div>
                  <div>
                    <img
                      className='w-full'
                      src='https://cdn.tuk.dev/assets/components/111220/Blg-6/blog(5).png'
                      alt='worker'
                    />
                    <div className='py-2 px-4 w-full flex justify-between bg-indigo-700'>
                      <p className='text-sm text-white font-semibold tracking-wide'>Bruce Wayne</p>
                      <p className='text-sm text-white font-semibold tracking-wide'>13TH Oct, 2020</p>
                    </div>
                    <div className='bg-white px-3  lg:px-6 py-4 rounded-bl-3xl rounded-br-3xl'>
                      <h1 className='text-lg text-gray-900 font-semibold tracking-wider'>Transactions</h1>
                      <p className='text-gray-700 text-sm  lg:text-base  lg:leading-8 pr-4 tracking-wide mt-2'>
                        Find the latest events updates or create events, concerts, conferences, workshops...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='flex items-center justify-center py-10 lg:px-0 sm:px-6 px-4'>
        <div className='container flex items-center justify-between border-t border-gray-200'>
          <div className='flex items-center pt-3 text-gray-600 hover:text-indigo-700 cursor-pointer'>
            <svg width={14} height={8} viewBox='0 0 14 8' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M1.1665 4H12.8332'
                stroke='currentColor'
                strokeWidth='1.25'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M1.1665 4L4.49984 7.33333'
                stroke='currentColor'
                strokeWidth='1.25'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M1.1665 4.00002L4.49984 0.666687'
                stroke='currentColor'
                strokeWidth='1.25'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
            <p className='text-sm ml-3 font-medium leading-none '>Previous</p>
          </div>
          <div className='sm:flex hidden'>
            <p className='text-sm font-medium leading-none cursor-pointer text-gray-600 hover:text-indigo-700 border-t border-transparent hover:border-indigo-400 pt-3 mr-4 px-2'>
              1
            </p>
            <p className='text-sm font-medium leading-none cursor-pointer text-gray-600 hover:text-indigo-700 border-t border-transparent hover:border-indigo-400 pt-3 mr-4 px-2'>
              2
            </p>
            <p className='text-sm font-medium leading-none cursor-pointer text-gray-600 hover:text-indigo-700 border-t border-transparent hover:border-indigo-400 pt-3 mr-4 px-2'>
              3
            </p>
            <p className='text-sm font-medium leading-none cursor-pointer text-indigo-700 border-t border-indigo-400 pt-3 mr-4 px-2'>
              4
            </p>
            <p className='text-sm font-medium leading-none cursor-pointer text-gray-600 hover:text-indigo-700 border-t border-transparent hover:border-indigo-400 pt-3 mr-4 px-2'>
              5
            </p>
            <p className='text-sm font-medium leading-none cursor-pointer text-gray-600 hover:text-indigo-700 border-t border-transparent hover:border-indigo-400 pt-3 mr-4 px-2'>
              6
            </p>
            <p className='text-sm font-medium leading-none cursor-pointer text-gray-600 hover:text-indigo-700 border-t border-transparent hover:border-indigo-400 pt-3 mr-4 px-2'>
              7
            </p>
            <p className='text-sm font-medium leading-none cursor-pointer text-gray-600 hover:text-indigo-700 border-t border-transparent hover:border-indigo-400 pt-3 mr-4 px-2'>
              8
            </p>
          </div>
          <div className='flex items-center pt-3 text-gray-600 hover:text-indigo-700 cursor-pointer'>
            <p className='text-sm font-medium leading-none mr-3'>Next</p>
            <svg width={14} height={8} viewBox='0 0 14 8' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M1.1665 4H12.8332'
                stroke='currentColor'
                strokeWidth='1.25'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M9.5 7.33333L12.8333 4'
                stroke='currentColor'
                strokeWidth='1.25'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M9.5 0.666687L12.8333 4.00002'
                stroke='currentColor'
                strokeWidth='1.25'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
