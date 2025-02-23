'use client'
import { ButtonBack, ButtonNext, CarouselProvider, Slide, Slider } from 'pure-react-carousel'

const Page = () => {
  return (
    <>
      <h1>blogs</h1>
      <div className='flex items-center flex-col justify-center lg:flex-row py-28 px-6 md:px-24 md:py-20 lg:py-32 gap-16 lg:gap-28'>
        <div className='w-full lg:w-1/2'>
          <img className='hidden lg:block' src='https://i.ibb.co/v30JLYr/Group-192-2.png' alt='' />
          <img className='hidden md:block lg:hidden' src='https://i.ibb.co/c1ggfn2/Group-193.png' alt='' />
          <img className='md:hidden' src='https://i.ibb.co/8gTVH2Y/Group-198.png' alt='' />
        </div>
        <div className='w-full lg:w-1/2'>
          <h1 className='py-4 text-3xl lg:text-4xl font-extrabold text-gray-800'>
            Looks like you ave found the doorway to the great nothing
          </h1>
          <p className='py-4 text-base text-gray-800'>
            The content you are looking for doesn at exist. Either it was removed, or you mistyped the link.
          </p>
          <p className='py-2 text-base text-gray-800'>
            Sorry about that! Please visit our hompage to get where you need to go.
          </p>
          <button className='w-full lg:w-auto my-4 border rounded-md px-1 sm:px-16 py-5 bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50'>
            Go back to Homepage
          </button>
        </div>
      </div>
      <div className='2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4'>
        <div className='flex flex-col lg:flex-row justify-between gap-8'>
          <div className='w-full lg:w-5/12 flex flex-col justify-center'>
            <h1 className='text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4'>About Us</h1>
            <p className='font-normal text-base leading-6 text-gray-600 '>
              It is a long established fact that a reader will be distracted by the readable content of a page when
              looking at its layout. The point of using Lorem Ipsum.In the first place we have granted to God, and by
              this our present charter confirmed for us and our heirs forever that the English Church shall be free, and
              shall have her rights entire, and her liberties inviolate; and we will that it be thus observed; which is
              apparent from
            </p>
          </div>
          <div className='w-full lg:w-8/12 '>
            <img className='w-full h-full' src='https://i.ibb.co/FhgPJt8/Rectangle-116.png' alt='A group of People' />
          </div>
        </div>
      </div>
      <div className='flex lg:flex-row flex-col justify-between gap-8 pt-12'>
        <div className='w-full lg:w-5/12 flex flex-col justify-center'>
          <h1 className='text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4'>Our Story</h1>
          <p className='font-normal text-base leading-6 text-gray-600 '>
            It is a long established fact that a reader will be distracted by the readable content of a page when
            looking at its layout. The point of using Lorem Ipsum.In the first place we have granted to God, and by this
            our present charter confirmed for us and our heirs forever that the English Church shall be free, and shall
            have her rights entire, and her liberties inviolate; and we will that it be thus observed; which is apparent
            from
          </p>
        </div>
        <div className='w-full lg:w-8/12 lg:pt-8'>
          <div className='grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:gap-4 shadow-lg rounded-md'>
            <div className='p-4 pb-6 flex justify-center flex-col items-center'>
              <img
                className='md:block hidden'
                src='https://i.ibb.co/FYTKDG6/Rectangle-118-2.png'
                alt='Alexa featured Img'
              />
              <img
                className='md:hidden block'
                src='https://i.ibb.co/zHjXqg4/Rectangle-118.png'
                alt='Alexa featured Img'
              />
              <p className='font-medium text-xl leading-5 text-gray-800 mt-4'>Alexa</p>
            </div>
            <div className='p-4 pb-6 flex justify-center flex-col items-center'>
              <img
                className='md:block hidden'
                src='https://i.ibb.co/fGmxhVy/Rectangle-119.png'
                alt='Olivia featured Img'
              />
              <img
                className='md:hidden block'
                src='https://i.ibb.co/NrWKJ1M/Rectangle-119.png'
                alt='Olivia featured Img'
              />
              <p className='font-medium text-xl leading-5 text-gray-800 mt-4'>Olivia</p>
            </div>
            <div className='p-4 pb-6 flex justify-center flex-col items-center'>
              <img
                className='md:block hidden'
                src='https://i.ibb.co/Pc6XVVC/Rectangle-120.png'
                alt='Liam featued Img'
              />
              <img
                className='md:hidden block'
                src='https://i.ibb.co/C5MMBcs/Rectangle-120.png'
                alt='Liam featued Img'
              />
              <p className='font-medium text-xl leading-5 text-gray-800 mt-4'>Liam</p>
            </div>
            <div className='p-4 pb-6 flex justify-center flex-col items-center'>
              <img
                className='md:block hidden'
                src='https://i.ibb.co/7nSJPXQ/Rectangle-121.png'
                alt='Elijah featured img'
              />
              <img
                className='md:hidden block'
                src='https://i.ibb.co/ThZBWxH/Rectangle-121.png'
                alt='Elijah featured img'
              />
              <p className='font-medium text-xl leading-5 text-gray-800 mt-4'>Elijah</p>
            </div>
          </div>
        </div>
      </div>
      <div className='lg:px-20 md:px-6 px-4 md:py-12 py-8'>
        <div className='lg:flex items-center justify-between'>
          <div className='lg:w-1/3'>
            <h1 className='text-4xl font-semibold leading-9 text-gray-800'>Indoor Interiors</h1>
            <p className='text-base leading-6 mt-4 text-gray-600'>
              Get inspired by our curated selection of luxiwood interiors. We hope get inspired to have luxiwood
              interior yourself. You’ll find tips here where you can buy a lot of cool furniture.
            </p>
            <button
              aria-label='view catalogue'
              className='focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 focus:outline-none mt-6 md:mt-8 text-base font-semibold leading-none text-gray-800 flex items-center hover:underline'
            >
              View Catalogue
              <svg
                className='ml-2 mt-1'
                width='12'
                height='8'
                viewBox='0 0 12 8'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M1.33325 4H10.6666' stroke='#1F2937' strokeLinecap='round' strokeLinejoin='round' />
                <path d='M8 6.66667L10.6667 4' stroke='#1F2937' strokeLinecap='round' strokeLinejoin='round' />
                <path d='M8 1.33398L10.6667 4.00065' stroke='#1F2937' strokeLinecap='round' strokeLinejoin='round' />
              </svg>
            </button>
          </div>
          <div className='lg:w-7/12 lg:mt-0 mt-8'>
            <div className='w-full h-full bg-red-200'>
              <img
                src='https://i.ibb.co/cbyDY74/pexels-max-vakhtbovych-6782351-1-1.png'
                alt='apartment design'
                className='w-full sm:block hidden'
              />
              <img
                src='https://i.ibb.co/ZVPGjGJ/pexels-max-vakhtbovych-6782351-1.png'
                alt='apartment design'
                className='sm:hidden block w-full'
              />
            </div>
            <div className='grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 lg:gap-8 gap-6 lg:mt-8 md:mt-6 mt-4'>
              <img
                src='https://i.ibb.co/4Jrp5TB/pexels-max-vakhtbovych-6782370-1.png'
                className='w-full'
                alt='kitchen'
              />
              <img
                src='https://i.ibb.co/0Jv3FSy/pexels-max-vakhtbovych-6436799-1-1.png'
                className='w-full'
                alt='sitting room'
              />
            </div>
          </div>
        </div>
      </div>

      <div className='bg-gray-800'>
        <div className='2xl:container 2xl:mx-auto md:py-12 lg:px-20 md:px-6 py-9 px-4'>
          <div id='viewerButton' className='hidden w-full flex justify-center'>
            <button className='bg-white text-indigo-600 shadow-md rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 py-5 px-10 font-semibold'>
              Open Quick View
            </button>
          </div>
          <div id='viewerBox' className='lg:p-10 md:p-6 p-4 bg-white'>
            <div className='flex justify-end'>
              <button aria-label='Close' className='focus:outline-none focus:ring-2 focus:ring-gray-800'>
                <svg width={32} height={32} viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M17.8799 15.9996L23.6133 10.2796C23.8643 10.0285 24.0054 9.688 24.0054 9.33293C24.0054 8.97786 23.8643 8.63733 23.6133 8.38626C23.3622 8.13519 23.0217 7.99414 22.6666 7.99414C22.3115 7.99414 21.971 8.13519 21.7199 8.38626L15.9999 14.1196L10.2799 8.38626C10.0288 8.13519 9.68832 7.99414 9.33325 7.99414C8.97818 7.99414 8.63766 8.13519 8.38659 8.38626C8.13551 8.63733 7.99446 8.97786 7.99446 9.33293C7.99446 9.688 8.13551 10.0285 8.38659 10.2796L14.1199 15.9996L8.38659 21.7196C8.26161 21.8435 8.16242 21.991 8.09473 22.1535C8.02704 22.316 7.99219 22.4902 7.99219 22.6663C7.99219 22.8423 8.02704 23.0166 8.09473 23.179C8.16242 23.3415 8.26161 23.489 8.38659 23.6129C8.51054 23.7379 8.658 23.8371 8.82048 23.9048C8.98296 23.9725 9.15724 24.0073 9.33325 24.0073C9.50927 24.0073 9.68354 23.9725 9.84602 23.9048C10.0085 23.8371 10.156 23.7379 10.2799 23.6129L15.9999 17.8796L21.7199 23.6129C21.8439 23.7379 21.9913 23.8371 22.1538 23.9048C22.3163 23.9725 22.4906 24.0073 22.6666 24.0073C22.8426 24.0073 23.0169 23.9725 23.1794 23.9048C23.3418 23.8371 23.4893 23.7379 23.6133 23.6129C23.7382 23.489 23.8374 23.3415 23.9051 23.179C23.9728 23.0166 24.0077 22.8423 24.0077 22.6663C24.0077 22.4902 23.9728 22.316 23.9051 22.1535C23.8374 21.991 23.7382 21.8435 23.6133 21.7196L17.8799 15.9996Z'
                    fill='#1F2937'
                  />
                </svg>
              </button>
            </div>
            <div className='mt-3 md:mt-4 lg:mt-0 flex flex-col lg:flex-row items-stretch justify-center lg:space-x-8'>
              <CarouselProvider
                naturalSlideWidth={100}
                naturalSlideHeight={100}
                isIntrinsicHeight={true}
                totalSlides={3}
                className='lg:w-1/2 flex justify-between items-strech bg-gray-50 px-2 py-20 md:py-6 md:px-6 lg:py-24'
              >
                <div className='flex items-center'>
                  <ButtonBack
                    aria-label='slide back'
                    className='focus:outline-none focus:ring-2 focus:ring-gray-800 hover:bg-gray-100'
                    role='button'
                  >
                    <svg
                      className='w-10 h-10 lg:w-16 lg:h-16'
                      viewBox='0 0 64 64'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M40 16L24 32L40 48'
                        stroke='#1F2937'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </ButtonBack>
                </div>
                <div className='slider'>
                  <div className='slide-ana lg:relative'>
                    <Slider>
                      <Slide index={0}>
                        <div className='flex'>
                          <img
                            src='https://i.ibb.co/fMGD6ZC/eugene-chystiakov-3ne-Swyntb-Q8-unsplash-1-removebg-preview-3-1.png'
                            alt='A black chair with wooden legs'
                            className='w-full h-full'
                          />
                        </div>
                      </Slide>
                      <Slide index={1}>
                        <div className='flex'>
                          <img
                            src='https://i.ibb.co/fMGD6ZC/eugene-chystiakov-3ne-Swyntb-Q8-unsplash-1-removebg-preview-3-1.png'
                            alt='A black chair with wooden legs'
                            className='w-full h-full'
                          />
                        </div>
                      </Slide>
                      <Slide index={2}>
                        <div className='flex'>
                          <img
                            src='https://i.ibb.co/fMGD6ZC/eugene-chystiakov-3ne-Swyntb-Q8-unsplash-1-removebg-preview-3-1.png'
                            alt='A black chair with wooden legs'
                            className='w-full h-full'
                          />
                        </div>
                      </Slide>
                    </Slider>
                  </div>
                </div>
                <div className='flex items-center'>
                  <ButtonNext role='button' aria-label='next slide' className='cursor-pointer ml-2'>
                    <svg
                      className='w-10 h-10 lg:w-16 lg:h-16'
                      viewBox='0 0 64 64'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M24 16L40 32L24 48'
                        stroke='#1F2937'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </ButtonNext>
                </div>
              </CarouselProvider>
              <div className='lg:w-1/2 flex flex-col justify-center mt-7 md:mt-8 lg:mt-0 pb-8 lg:pb-0'>
                <h1 className='text-3xl lg:text-4xl font-semibold text-gray-800'>Bar Stool</h1>
                <p className='text-base leading-normal text-gray-600 mt-2'>
                  You don t just want to be comfortable sitting in a bar stool—you want to be comfortable shimmying it
                  up to the bar, closer to your lover, or back slightly to include a third person in the conversation.
                </p>
                <p className='text-3xl font-medium text-gray-600 mt-8 md:mt-10'>$790</p>
                <div className='flex items-center flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 lg:space-x-8 mt-8 md:mt-16'>
                  <button className='w-full md:w-3/5 border border-gray-800 text-base font-medium leading-none text-white uppercase py-6 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 bg-gray-800'>
                    Add to Cart
                  </button>
                  <button className='w-full md:w-2/5 border border-gray-800 text-base font-medium leading-none text-gray-800 uppercase py-6 bg-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 hover:bg-gray-800 hover:text-white'>
                    View Details
                  </button>
                </div>
                <div className='mt-6'>
                  <button className='text-xl underline text-gray-800 capitalize hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800'>
                    add to wishlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
