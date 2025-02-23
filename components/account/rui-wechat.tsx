import { Badge, Flex, Heading, Skeleton, Text } from '@radix-ui/themes'

const RuiWechat = () => {
  return (
    <>
      <Flex className='text-base leading-none space-x-0.5' align='center' justify='start'>
        <Heading as='h3' className='mb-0 text-base font-bold leading-none'>
          扫码登录
        </Heading>
        <Badge radius='full' variant='solid' color='blue'>
          仅支持微信
        </Badge>
      </Flex>
      <Flex align='center' justify='start' className='my-2.5'>
        <Skeleton className='h-[144px] w-[144px] border bg-gray-100'></Skeleton>
      </Flex>
      <div>
        打开 <Text color='blue'>微信APP</Text>
      </div>
      <p>点击“发现-扫一扫”登录</p>
    </>
  )
}

export default RuiWechat
