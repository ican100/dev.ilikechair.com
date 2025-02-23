'use client'
import { Heading, Text } from '@radix-ui/themes'

const Page = () => {
  return (
    <>
      <div className='bg-white text-black dark:bg-black dark:text-white py-20'>
        <div className='container mx-auto px-4 py-8'>
          <Text className='mb-4'>更新日期: 2024-7-15</Text>
          <div className='w-full flex'>
            <Heading as='h1' className='text-3xl font-bold mb-4 text-gray-800'>
              用户协议
            </Heading>
          </div>
          <br />
          <p className='mb-4 text-base'>
            欢迎您使用我们的服务。为确保您在使用服务时的合法权益，您在使用前应当阅读并同意以下条款。本协议一旦开始使用即生效，您即表明您已接受本协议的全部内容。
          </p>
          <div className='pb-5'>
            <h2 className='mt-2 mb-0.5 font-bold text-gray-700 dark:text-gray-300'>1. 服务内容</h2>
            <p>
              我们将根据协议提供相应的服务。具体服务内容以平台和应用程序的实际功能为准。我们有权在不另行通知的情况下，调整或更新服务内容。
            </p>
            <h2 className='mt-2 mb-0.5 font-bold text-gray-700 dark:text-gray-300'>2. 用户注册</h2>
            <p>
              您在使用本服务前需要注册账户。注册时，您应提供真实、准确、完整的信息，并及时更新。用户信息将严格保密，未经用户授权，我们不会向第三方披露用户的个人信息。
            </p>
            <h2 className='mt-2 mb-0.5 font-bold text-gray-700 dark:text-gray-300'>3. 用户行为规范</h2>
            <p>用户在使用本服务时，必须遵守相关法律法规，不得进行以下行为：</p>
            <ul className='md:ml-8 ml-4'>
              <li className='list-disc'>
                <p>传播非法、淫秽、暴力、恐怖、侮辱等违法违规内容。</p>
              </li>
              <li className='list-disc'>
                <p>未经授权使用他人的账户或盗取他人信息。</p>
              </li>
              <li className='list-disc'>
                <p>破坏服务平台的正常运行或进行恶意攻击。</p>
              </li>
            </ul>
            <h2 className='mt-2 mb-0.5 font-bold text-gray-700 dark:text-gray-300'>4. 知识产权</h2>
            <p>本服务的所有内容，包括但不限于文字、图像、标志、软件等，均为我们或相关权利人拥有的知识产权。</p>
            <p>未经授权，您不得以任何方式复制、传播、修改或使用上述内容。</p>
            <h2 className='mt-2 mb-0.5 font-bold text-gray-700 dark:text-gray-300'>5. 隐私保护</h2>
            <p>
              我们会根据隐私政策保护您的个人信息。请您注意，我们仅会在必要时收集并使用您的个人信息，并会采取合理的安全措施保护您的信息。
            </p>
            <h2 className='mt-2 mb-0.5 font-bold text-gray-700 dark:text-gray-300'>6. 服务的变更与中止</h2>
            <p>
              我们有权根据需要随时对服务进行变更、暂停或终止，且不承担任何责任。若您不再需要使用本服务，您可以随时停止使用。
            </p>
            <h2 className='mt-2 mb-0.5 font-bold text-gray-700 dark:text-gray-300'>7. 免责声明</h2>
            <p>
              我们不保证服务的稳定性或完全无误，且不承担因不可抗力因素（如自然灾害、网络故障等）导致的服务中断或数据丢失等问题。
            </p>
            <h2 className='mt-2 mb-0.5 font-bold text-gray-700 dark:text-gray-300'>8. 法律适用与争议解决</h2>
            <p>本协议适用中华人民共和国法律，任何因使用本服务产生的争议，应提交至我们所在地的法院管辖。</p>
            <h2 className='mt-2 mb-0.5 font-bold text-gray-700 dark:text-gray-300'>9. 协议的修改</h2>
            <p>
              我们有权随时对本协议进行修改。修改后的协议一经发布，立即生效。如果您继续使用本服务，则表示您同意修改后的条款。
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
