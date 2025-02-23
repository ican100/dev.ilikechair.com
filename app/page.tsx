import { Flex, Text } from '@radix-ui/themes'
import { Activity, FerrisWheel, LibraryBig, SquareCheckBig } from 'lucide-react'
import Link from 'next/link'
import { FaStar } from 'react-icons/fa'
import { FaArrowRightLong } from 'react-icons/fa6'

import fadb5c968a406ead6755dc3461754a from '@/assets/images/84fadb5c968a406ead6755dc3461754a.jpg'
import a2b11bf2b44cb2b6d1a050dc96eab5 from '@/assets/images/a2b11bf2b44cb2b6d1a050dc96eab5.jpg'
import a622005f3e84f0ba2f1e09c346b5e16 from '@/assets/images/a622005f3e84f0ba2f1e09c346b5e16.jpg'
import a632a0fc79d46a69d2505b975d19fc7 from '@/assets/images/a632a0fc79d46a69d2505b975d19fc7.jpg'
import a79d45453ff42b88e8e3ae95cb4a999 from '@/assets/images/a79d45453ff42b88e8e3ae95cb4a999.jpg'
import a8c63a6f81b74cacac2052b0d786d757 from '@/assets/images/a8c63a6f81b74cacac2052b0d786d757.jpg'
import ab6c58052fe24da09baf2beabe29ac79 from '@/assets/images/ab6c58052fe24da09baf2beabe29ac79.jpg'
import ab6d7d46ae24fa7942588d0d71fa08b from '@/assets/images/ab6d7d46ae24fa7942588d0d71fa08b.jpg'
import abb51f9e2224edcaccb7d8b918d2d2b from '@/assets/images/abb51f9e2224edcaccb7d8b918d2d2b.jpg'
import b2db93a6ae4a44fd8ee56828b97b6e3e from '@/assets/images/b2db93a6ae4a44fd8ee56828b97b6e3e.jpg'
import b354efdb62004db2b930dce9714e92b5 from '@/assets/images/b354efdb62004db2b930dce9714e92b5.jpg'
import cd83a30f76d646ef8e84e0aca75887ed from '@/assets/images/cd83a30f76d646ef8e84e0aca75887ed.jpg'
import ce4bd1342ae43318f727dcd2132d9f9 from '@/assets/images/ce4bd1342ae43318f727dcd2132d9f9.jpg'
import da6086f145ac49acabb375a3b4a5c384 from '@/assets/images/da6086f145ac49acabb375a3b4a5c384.jpg'
import dac96d1d797f444f98a4768f8729c820 from '@/assets/images/dac96d1d797f444f98a4768f8729c820.jpg'
import e558a4f9384942b70de5052e0168aa from '@/assets/images/e558a4f9384942b70de5052e0168aa.jpg'
import e8ea85f268e34a6c90714384b56f99d5 from '@/assets/images/e8ea85f268e34a6c90714384b56f99d5.jpg'
import e96c5d5bb104887b8da6d9a13b23fd8 from '@/assets/images/e96c5d5bb104887b8da6d9a13b23fd8.jpg'
import f27602cb3e5142ada2a987c975c3dbc5 from '@/assets/images/f27602cb3e5142ada2a987c975c3dbc5.jpg'
import f2c40b103ff450da5879766e14f25f6 from '@/assets/images/f2c40b103ff450da5879766e14f25f6.jpg'
import f6d6855ae4e94b17aa9a03b55205f34a from '@/assets/images/f6d6855ae4e94b17aa9a03b55205f34a.jpg'
import f79c9c707114edabf7bc31cbe5fd5a2 from '@/assets/images/f79c9c707114edabf7bc31cbe5fd5a2.jpg'
import f9faf3cd17e143489eba220f00435b51 from '@/assets/images/f9faf3cd17e143489eba220f00435b51.jpg'
import fb190c34beb54a2eaaa09b24d3972912 from '@/assets/images/fb190c34beb54a2eaaa09b24d3972912.jpg'
import fc8ad0e763154a8f8b827bbce4efedde from '@/assets/images/fc8ad0e763154a8f8b827bbce4efedde.jpg'

export default function Home() {
  return (
    <>
      <section className='relative bg-gray-900'>
        <div className='relative z-10 max-w-screen-xl mx-auto px-4 py-28 md:px-8'>
          <div className='space-y-5 max-w-4xl mx-auto text-center'>
            <h2 className='text-4xl text-white font-extrabold mx-auto md:text-5xl'>开启天赋探索之旅</h2>
            <p className='max-w-2xl mx-auto text-gray-400'>
              通过科学的评估方法，我们为你提供全面的能力与性格分析，帮助你识别与生俱来的潜能，让你了解自己的独特优势，助力你在职场和生活中做出更明智的决策。
            </p>
            <div className='justify-center items-center gap-x-3 sm:flex'>
              <Link href='/assessments'>
                <Flex
                  gapX='2'
                  justify='center'
                  align='center'
                  className='py-2.5 px-4 mt-3 w-full text-sm text-white font-medium bg-sky-500 hover:bg-sky-400 active:bg-sky-600 duration-150 rounded-lg-lg sm:mt-0 sm:w-auto'
                >
                  <Text>点击测试</Text>
                  <FaArrowRightLong />
                </Flex>
              </Link>
            </div>
            <div className='flex justify-center items-center gap-x-4 text-gray-400 text-sm'>
              <Flex gapX='1'>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </Flex>
              <p>
                <span className='text-gray-100'>5.0</span> 好评，今天超过200人测评
              </p>
            </div>
          </div>
        </div>
        <div
          className='absolute inset-0 m-auto max-w-xs h-[357px] blur-[118px] sm:max-w-md md:max-w-lg'
          style={{
            background:
              'linear-gradient(106.89deg, rgba(192, 132, 252, 0.11) 15.73%, rgba(14, 165, 233, 0.41) 15.74%, rgba(232, 121, 249, 0.26) 56.49%, rgba(79, 70, 229, 0.4) 115.91%)'
          }}
        ></div>
      </section>

      <div className='2xl:container 2xl:mx-auto'>
        <div className='lg:px-20 md:px-6 px-4 md:py-20 py-16'>
          <div className='flex flex-col items-center justify-center'>
            <h1 className='text-4xl font-semibold leading-9 text-center text-gray-800'>儿童阶段：发现天赋的起点</h1>
            <p className='text-base leading-normal text-center text-gray-600 mt-4 lg:w-1/2 md:w-10/12 w-11/12'>
              探索孩子的独特潜力，发现他们的天赋与兴趣！通过简单的测试和活动，帮助孩子找到自己热爱的领域，开启未来的成长之路。
            </p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-5 lg:grid-cols-5 gap-6 lg:gap-8 mt-8 md:mt-10'>
            <div className='bg-gray-50 cursor-pointer'>
              <img className='rounded-lg shadow' src={b354efdb62004db2b930dce9714e92b5.src} alt='儿童阶段1' />
            </div>
            <div className='bg-gray-50 cursor-pointer'>
              <img className='rounded-lg shadow' src={fadb5c968a406ead6755dc3461754a.src} alt='儿童阶段2' />
            </div>
            <div className='bg-gray-50 cursor-pointer'>
              <img className='rounded-lg shadow' src={ce4bd1342ae43318f727dcd2132d9f9.src} alt='儿童阶段2' />
            </div>
            <div className='bg-gray-50 cursor-pointer'>
              <img className='rounded-lg shadow' src={ab6c58052fe24da09baf2beabe29ac79.src} alt='儿童阶段2' />
            </div>
            <div className='bg-gray-50 cursor-pointer'>
              <img className='rounded-lg shadow' src={f9faf3cd17e143489eba220f00435b51.src} alt='儿童阶段2' />
            </div>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8 mt-4 md:mt-6 lg:mt-8'>
            <div className='bg-gray-50'>
              <img className='rounded-lg shadow' src={fc8ad0e763154a8f8b827bbce4efedde.src} alt='' />
            </div>
            <div className='bg-gray-50'>
              <img className='rounded-lg shadow' src={a79d45453ff42b88e8e3ae95cb4a999.src} alt='' />
            </div>
            <div className='bg-gray-50'>
              <img className='rounded-lg shadow' src={dac96d1d797f444f98a4768f8729c820.src} alt='' />
            </div>
          </div>
        </div>
      </div>

      <div className='2xl:mx-auto 2xl:container'>
        <div className='lg:px-20 lg:py-16 md:py-12 md:px-6 py-9 px-4 sm:w-auto'>
          <div className='flex flex-col items-center justify-center'>
            <h1 className='text-4xl font-semibold leading-9 text-center text-gray-800'>青少年阶段：潜力发展的关键期</h1>
            <p className='text-base leading-normal text-center text-gray-600 mt-4 lg:w-1/2 md:w-10/12 w-11/12'>
              青少年正处于塑造未来的关键时期，了解他们的天赋与发展方向至关重要！
              测评结果将帮助你了解孩子的优势，指导他们选择合适的兴趣爱好和职业方向。
            </p>
          </div>
          <div className='lg:flex items-stretch md:mt-12 mt-8'>
            <div className='lg:w-1/2'>
              <div className='sm:flex items-center justify-between xl:gap-x-8 gap-x-6'>
                <div className='sm:w-1/2 relative'>
                  <img src={a2b11bf2b44cb2b6d1a050dc96eab5.src} className='w-full rounded-lg shadow' alt='' />
                </div>
                <div className='sm:w-1/2 sm:mt-0 mt-4 relative'>
                  <img src={b2db93a6ae4a44fd8ee56828b97b6e3e.src} className='w-full rounded-lg shadow' alt='' />
                </div>
              </div>
              <div className='relative'>
                <img
                  src={abb51f9e2224edcaccb7d8b918d2d2b.src}
                  className='w-full rounded-lg shadow mt-8 md:mt-6'
                  alt=''
                />
              </div>
            </div>
            <div className='lg:w-1/2 xl:ml-8 lg:ml-4 lg:mt-0 md:mt-6 mt-4 lg:flex flex-col justify-between'>
              <div className='relative'>
                <img src={f79c9c707114edabf7bc31cbe5fd5a2.src} className='w-full rounded-lg shadow' alt='' />
              </div>
              <div className='sm:flex items-center justify-between xl:gap-x-8 gap-x-6 md:mt-6 mt-4'>
                <div className='relative w-full'>
                  <img src={a8c63a6f81b74cacac2052b0d786d757.src} className='w-full rounded-lg shadow' alt='' />
                </div>

                <div className='relative w-full sm:mt-0 mt-4'>
                  <img src={da6086f145ac49acabb375a3b4a5c384.src} className='w-full rounded-lg shadow' alt='' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className='2xl:container 2xl:mx-auto pt-16'>
        <div className='lg:px-20 md:px-6 px-4 md:py-12 py-8'>
          <div className='flex items-center flex-col'>
            <h2 className='focus:outline-none text-4xl lg:text-4xl font-extrabold text-center leading-10 text-gray-800 lg:w-5/12 md:w-9/12 pt-4'>
              大学生阶段：职业方向的探索
            </h2>
            <p className='text-base leading-normal text-center text-gray-600 mt-4 lg:w-1/2 md:w-10/12 w-11/12'>
              为即将进入职场的大学生提供个性化的职业建议，明确未来的方向。
              通过对性格和能力的分析，帮助学生找到最适合的职业领域，提升职场竞争力。
            </p>
          </div>
          <div className='focus:outline-none mt-20 flex flex-wrap justify-center gap-10 px-4'>
            <div tabIndex={0} aria-label='card 1' className='focus:outline-none flex sm:w-full md:w-5/12 pb-20'>
              <div className='w-20 h-20 relative mr-5'>
                <div className='absolute top-0 right-0 bg-indigo-100 rounded-lg w-16 h-16 mt-2 mr-1' />
                <div className='absolute text-white bottom-0 left-0 bg-indigo-700 rounded-lg w-16 h-16 flex items-center justify-center mt-2 mr-3'>
                  <LibraryBig />
                </div>
              </div>
              <div className='w-10/12'>
                <h2 tabIndex={0} className='focus:outline-none text-lg font-bold leading-tight text-gray-800'>
                  自我认知：了解你的优势与性格
                </h2>
                <p tabIndex={0} className='focus:outline-none text-base text-gray-600 leading-normal pt-2'>
                  在竞争激烈的时代，认清自己是职业规划的第一步。通过科学的测评，了解你的性格特质、学习风格和天赋能力，为未来的职业选择奠定基础。
                </p>
              </div>
            </div>
            <div tabIndex={0} aria-label='card 2' className='focus:outline-none flex sm:w-full md:w-5/12 pb-20'>
              <div className='w-20 h-20 relative mr-5'>
                <div className='absolute top-0 right-0 bg-indigo-100 rounded-lg w-16 h-16 mt-2 mr-1' />
                <div className='absolute text-white bottom-0 left-0 bg-indigo-700 rounded-lg w-16 h-16 flex items-center justify-center mt-2 mr-3'>
                  <SquareCheckBig />
                </div>
              </div>
              <div className='w-10/12'>
                <h2 tabIndex={0} className='focus:outline-none text-lg font-semibold leading-tight text-gray-800'>
                  职业兴趣：找到让你充满热情的方向
                </h2>
                <p tabIndex={0} className='focus:outline-none text-base text-gray-600 leading-normal pt-2'>
                  你真正热爱的是什么？通过测试分析你的职业兴趣，帮助你发现那些让你动力十足的领域，找到与自身天赋完美匹配的职业方向。
                </p>
              </div>
            </div>
            <div tabIndex={0} aria-label='card 3' className='focus:outline-none flex sm:w-full md:w-5/12 pb-20'>
              <div className='w-20 h-20 relative mr-5'>
                <div className='absolute top-0 right-0 bg-indigo-100 rounded-lg w-16 h-16 mt-2 mr-1' />
                <div className='absolute text-white bottom-0 left-0 bg-indigo-700 rounded-lg w-16 h-16 flex items-center justify-center mt-2 mr-3'>
                  <Activity />
                </div>
              </div>
              <div className='w-10/12'>
                <h2 tabIndex={0} className='focus:outline-none text-lg font-semibold leading-tight text-gray-800'>
                  能力评估：明确你的核心竞争力
                </h2>
                <p tabIndex={0} className='focus:outline-none text-base text-gray-600 leading-normal pt-2'>
                  什么是你在职场中的杀手锏？通过对逻辑思维、创造力、沟通能力等关键技能的评估，精准定位你的核心竞争力，提升职业发展的起点。
                </p>
              </div>
            </div>
            <div tabIndex={0} aria-label='card 4' className='focus:outline-none flex sm:w-full md:w-5/12 pb-20'>
              <div className='w-20 h-20 relative mr-5'>
                <div className='absolute top-0 right-0 bg-indigo-100 rounded-lg w-16 h-16 mt-2 mr-1' />
                <div className='absolute text-white bottom-0 left-0 bg-indigo-700 rounded-lg w-16 h-16 flex items-center justify-center mt-2 mr-3'>
                  <FerrisWheel />
                </div>
              </div>
              <div className='w-10/12'>
                <h2 tabIndex={0} className='focus:outline-none text-lg font-semibold leading-tight text-gray-800'>
                  职业匹配：定制你的未来职业蓝图
                </h2>
                <p tabIndex={0} className='focus:outline-none text-base text-gray-600 leading-normal pt-2'>
                  不确定哪种职业适合你？基于测评结果，为你推荐最匹配的职业选择和发展路径，助你明确目标，规划出适合自己的职业蓝图。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className='xl:mx-auto 2xl:container py-20 2xl:px-0 px-6'>
        <div className='lg:flex items-center justify-between'>
          <div className='lg:w-1/2 w-full'>
            <p className='text-base leading-4 text-gray-600'>找到适合自己的岗位</p>
            <h1 role='heading' className='md:text-5xl text-3xl font-bold leading-10 mt-3 text-gray-800'>
              职场新人阶段
            </h1>
            <p className='text-base leading-5 mt-5 text-gray-600'>
              进入职场的第一步，先了解自己的优势和发展空间。
              天赋测评帮助新人更好地适应工作环境，找到最适合自己的岗位，开启职业生涯。
            </p>
            <div className='w-56'>
              <div className='bg-gray-100 shadow rounded-lg-full flex items-center mt-10'>
                <button
                  className='bg-gray-100 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 focus:outline-none text-base leading-none text-gray-600 rounded-lg-full py-4 px-6 mr-1'
                  id='monthly'
                >
                  Monthly
                </button>
                <button
                  className='bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 focus:outline-none text-base leading-none text-white rounded-lg-full py-4 px-6'
                  id='annually'
                >
                  Annually
                </button>
              </div>
            </div>
          </div>
          <div className='xl:w-1/2 lg:w-7/12 relative w-full lg:mt-0 mt-12 md:px-8' role='list'>
            <img
              src='https://i.ibb.co/0n6DSS3/bgimg.png'
              className='absolute w-full -ml-12 mt-24'
              alt='background circle images'
            />
            <div role='listitem' className='bg-white cursor-pointer shadow rounded-lg-lg p-8 relative z-30'>
              <div className='md:flex items-center justify-between'>
                <h2 className='text-2xl font-semibold leading-6 text-gray-800'>职业定位：确定你的发展方向</h2>
                <p className='text-2xl font-semibold md:mt-0 mt-4 leading-6 text-gray-800'>FREE</p>
              </div>
              <p className='md:w-80 text-base leading-6 mt-4 text-gray-600'>
                作为职场新人，第一步是明确自己的职业定位。通过深度的自我评估，帮助你了解自己的优势、兴趣和工作偏好，为进入职场打下坚实基础。
              </p>
            </div>
            <div role='listitem' className='bg-white cursor-pointer shadow rounded-lg-lg mt-3 flex relative z-30'>
              <div className='w-2.5  h-auto bg-indigo-700 rounded-lg-tl-md rounded-lg-bl-md' />
              <div className='w-full p-8'>
                <div className='md:flex items-center justify-between'>
                  <h2 className='text-2xl font-semibold leading-6 text-gray-800'>技能匹配：了解并提升你的核心竞争力</h2>
                  <p className='text-2xl md:mt-0 mt-4 font-semibold leading-6 text-gray-800'>
                    $18<span className='font-normal text-base'>/mo</span>
                  </p>
                </div>
                <p className='md:w-80 text-base leading-6 mt-4 text-gray-600'>
                  职场中，技能是你的竞争力。通过全面的能力评估，了解自己当前的技能水平，找到最适合你的岗位，同时为未来的职业提升制定具体的技能发展计划。
                </p>
              </div>
            </div>
            <div role='listitem' className='bg-white cursor-pointer shadow rounded-lg-lg p-8 relative z-30 mt-7'>
              <div className='md:flex items-center justify-between'>
                <h2 className='text-2xl font-semibold leading-6 text-gray-800'>岗位探索：选择最适合的职业起点</h2>
                <p className='text-2xl md:mt-0 mt-4 font-semibold leading-6 text-gray-800'>
                  $18<span className='font-normal text-base'>/mo</span>
                </p>
              </div>
              <p className='md:w-80 text-base leading-6 mt-4 text-gray-600'>
                选择正确的岗位是职场生涯成功的关键。根据你的兴趣和能力，提供最适合你的岗位推荐，帮助你快速找到合适的职业起点，顺利开启职场之路。
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='xl:mx-auto 2xl:container pt-16'>
        <div className='w-11/12 xl:w-2/3 lg:w-2/3 md:w-2/3 mx-auto sm:mb-10 mb-16'>
          <h1 className='xl:text-4xl md:text-3xl text-xl text-center text-gray-800 font-extrabold mb-5 pt-4'>
            职业发展阶段：精进与突破
          </h1>
          <p className='text-base leading-6 text-gray-600 text-center font-normal xl:w-10/12 xl:mx-auto'>
            职业发展的每个阶段，都需要了解自己，持续优化能力。测评帮助职业人士发现自己的盲点，找到提升自我的方向，帮助你突破职业瓶颈。
          </p>
        </div>
        <div className='xl:py-16 lg:py-16 md:py-16 sm:py-16 px-4 md:px-15 grid grid-cols-1 md:grid-cols-4 gap-2'>
          <div>
            <img src={a632a0fc79d46a69d2505b975d19fc7.src} className='w-full rounded-lg shadow' alt='' />
          </div>
          <div>
            <img src={e558a4f9384942b70de5052e0168aa.src} className='w-full rounded-lg shadow' alt='' />
          </div>
          <div>
            <img src={cd83a30f76d646ef8e84e0aca75887ed.src} className='w-full rounded-lg shadow' alt='' />
          </div>
          <div>
            <img src={f27602cb3e5142ada2a987c975c3dbc5.src} className='w-full rounded-lg shadow' alt='' />
          </div>
          <div>
            <img src={a622005f3e84f0ba2f1e09c346b5e16.src} className='w-full rounded-lg shadow' alt='' />
          </div>
          <div>
            <img src={e96c5d5bb104887b8da6d9a13b23fd8.src} className='w-full rounded-lg shadow' alt='' />
          </div>
          <div>
            <img src={e8ea85f268e34a6c90714384b56f99d5.src} className='w-full rounded-lg shadow' alt='' />
          </div>
          <div>
            <img src={f2c40b103ff450da5879766e14f25f6.src} className='w-full rounded-lg shadow' alt='' />
          </div>
        </div>
      </div>

      <div className='xl:mx-auto 2xl:container flex justify-center items-center py-12 px-4 sm:px-6 2xl:px-0'>
        <div className='flex flex-col lg:flex-row justify-center items-center space-y-6 lg:space-y-0'>
          <div className='w-80 sm:w-auto flex flex-col justify-start items-start'>
            <div>
              <p className='text-3xl xl:text-4xl font-semibold leading-9 text-gray-800'>
                高级管理阶段：领导力与决策优化
              </p>
            </div>
            <div className='mt-4 lg:w-4/5 xl:w-3/5'>
              <p className='text-base leading-6 text-gray-600'>
                对于高级管理者而言，了解领导风格和决策方式至关重要。天赋测评为领导者提供深入的个人分析，帮助提升决策力和团队协作能力。
              </p>
            </div>
            <div className='mt-16 w-full'>
              <Link href='/assessments'>
                <Flex
                  justify='between'
                  align='center'
                  className='px-4 bg-gray-900 w-full lg:w-72 h-14 text-white hover:bg-gray-700'
                >
                  <Text className='text-base font-medium leading-5'>立即参与</Text>
                  <FaArrowRightLong />
                </Flex>
              </Link>
            </div>
          </div>

          <div className='flex flex-col sm:flex-row justify-center items-center sm:space-x-5 xl:space-x-8 space-y-4 sm:space-y-0'>
            <div>
              <img className='rounded-lg shadow hidden lg:block' src={f6d6855ae4e94b17aa9a03b55205f34a.src} alt='' />
            </div>
            <div className='flex flex-col justify-center items-center space-y-4 sm:space-y-5 lg:space-y-5 xl:space-y-8'>
              <div>
                <img className='rounded-lg shadow hidden lg:block' src={ab6d7d46ae24fa7942588d0d71fa08b.src} alt='' />
              </div>
              <div>
                <img className='rounded-lg shadow hidden lg:block' src={fb190c34beb54a2eaaa09b24d3972912.src} alt='' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
