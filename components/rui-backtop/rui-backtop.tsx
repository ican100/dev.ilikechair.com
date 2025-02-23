'use client'

import { Box, Flex } from '@radix-ui/themes'
import { useEffect, useState } from 'react'
import { MdKeyboardDoubleArrowUp } from 'react-icons/md'
import { animateScroll as scroll } from 'react-scroll'

const RuiBacktop = () => {
  const offsetFromTop = 600
  const [visible, setVisible] = useState<boolean>(false)
  useEffect(() => {
    const listener = (e: Event) => {
      const window = e.currentTarget as Window
      setVisible(window.scrollY > offsetFromTop)
    }

    window.addEventListener('scroll', listener, { passive: true })
    return () => window.removeEventListener('scroll', listener)
  }, [])

  const scrollToTop = () => scroll.scrollToTop()

  if (!visible) return null

  return (
    <div className='fixed bottom-24 md:bottom-8 right-4 z-[99]'>
      <Flex
        justify='center'
        align='center'
        role='presentation'
        onClick={scrollToTop}
        aria-label='scroll to top'
        className='cursor-pointer transition duration-300 ease-in-out'
      >
        <Box className='w-12 h-12 rounded flex justify-center items-center bg-gray-700 text-white hover:bg-gray-900'>
          <MdKeyboardDoubleArrowUp className='text-2xl' />
        </Box>
      </Flex>
    </div>
  )
}

export default RuiBacktop
