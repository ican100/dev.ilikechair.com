'use client'
import { Heading, Text } from '@radix-ui/themes'

import { email, tel } from '@/config'
const Page = () => {
  return (
    <>
      <div className='bg-white text-black dark:bg-black dark:text-white py-20'>
        <div className='container mx-auto px-4 py-8'>
          <Text className='mb-4'>更新日期: 2024-7-15</Text>
          <div className='w-full flex'>
            <Heading as='h1' className='text-3xl font-bold mb-4 text-gray-800'>
              隐私政策
            </Heading>
          </div>
          <br />
          <p className='mb-4 text-base'>
            本隐私政策（以下简称“本政策”）旨在帮助您了解我们如何收集、使用、存储及保护您的个人信息。请在使用我们的服务前，仔细阅读并理解本政策。如果您使用我们的服务，表示您同意我们按照本政策的内容收集、使用、存储及共享您的个人信息。
          </p>
          <div className='pb-5'>
            <h2 className='mt-2 mb-0.5 font-bold text-gray-700 dark:text-gray-300'>1. 我们收集的信息</h2>
            <p>在您使用我们的服务时，我们可能会收集以下类型的信息：</p>
            <ul className='md:ml-8 ml-4'>
              <li className='list-disc'>
                <p>个人身份信息：包括您的姓名、邮箱地址、手机号码、身份证号码等；</p>
              </li>
              <li className='list-disc'>
                <p>设备信息：包括您设备的型号、操作系统版本、设备识别码、IP地址、网络状态等；</p>
              </li>
              <li className='list-disc'>
                <p>服务使用数据：包括您的操作日志、使用频率、访问页面、点击数据等。</p>
              </li>
            </ul>
            <h2 className='mt-2 mb-0.5 font-bold text-gray-700 dark:text-gray-300'>2. 信息的使用</h2>
            <p>我们收集的信息将用于以下目的：</p>
            <ul className='md:ml-8 ml-4'>
              <li className='list-disc'>
                <p>提供、维护、改进我们的服务；</p>
              </li>
              <li className='list-disc'>
                <p>向您发送与服务相关的通知和信息；</p>
              </li>
              <li className='list-disc'>
                <p>分析和研究用户行为，以优化用户体验；</p>
              </li>
              <li className='list-disc'>
                <p>法律要求或保护您的权益。</p>
              </li>
            </ul>
            <h2 className='mt-2 mb-0.5 font-bold text-gray-700 dark:text-gray-300'>3. 信息的存储与保护</h2>
            <p>
              我们会采取合理的技术和管理措施，保障您的个人信息安全。您的信息将存储在我们的服务器中，并遵循严格的安全控制标准。尽管我们会尽最大努力保护您的信息，但无法保证绝对的安全性，因此请您谨慎使用。
            </p>
            <h2 className='mt-2 mb-0.5 font-bold text-gray-700 dark:text-gray-300'>4. 信息共享</h2>
            <p>
              除非根据法律法规或您的授权，我们不会将您的个人信息出售、出租或以其他方式向第三方披露。然而，在以下情况下，我们可能会共享您的信息：
            </p>
            <ul className='md:ml-8 ml-4'>
              <li className='list-disc'>
                <p>与我们的合作伙伴或服务提供商共享，为您提供服务；</p>
              </li>
              <li className='list-disc'>
                <p>根据法律要求、政府要求或司法程序提供您的信息；</p>
              </li>
              <li className='list-disc'>
                <p>为了保护我们的合法权益、财产和用户的安全。</p>
              </li>
            </ul>
            <h2 className='mt-2 mb-0.5 font-bold text-gray-700 dark:text-gray-300'>5. 第三方链接与服务</h2>
            <p>
              我们的服务中可能包含指向第三方网站或服务的链接。我们不控制这些网站和服务的隐私政策，因此我们建议您在访问第三方网站或服务时，阅读其隐私政策。我们对第三方网站的内容和隐私实践不承担任何责任。
            </p>
            <h2 className='mt-2 mb-0.5 font-bold text-gray-700 dark:text-gray-300'>6. 您的权利</h2>
            <p>根据法律规定，您对您的个人信息拥有以下权利：</p>
            <ul className='md:ml-8 ml-4'>
              <li className='list-disc'>
                <p>查询、访问、更新您的个人信息；</p>
              </li>
              <li className='list-disc'>
                <p>请求删除您的个人信息（在符合条件的情况下）；</p>
              </li>
              <li className='list-disc'>
                <p>撤回对个人信息处理的同意。</p>
              </li>
              <li className='list-disc'>
                <p>如果您希望行使这些权利，您可以通过联系我们的方式进行。</p>
              </li>
            </ul>
            <h2 className='mt-2 mb-0.5 font-bold text-gray-700 dark:text-gray-300'>7. 未成年人隐私保护</h2>
            <p>
              我们非常重视未成年人的隐私保护。如果您未满18岁，请在父母或法定监护人的同意下使用我们的服务。我们不会故意收集未成年人的个人信息。
            </p>
            <h2 className='mt-2 mb-0.5 font-bold text-gray-700 dark:text-gray-300'>8. 本政策的更新</h2>
            <p>
              我们可能会根据法律、法规的变化或业务发展的需要更新本政策。任何修改后的隐私政策将在本页面公布，且自公布之日起生效。请定期查看本政策，以了解我们的隐私保护措施是否有更新。
            </p>
            <h2 className='mt-2 mb-0.5 font-bold text-gray-700 dark:text-gray-300'>9. 联系我们</h2>
            <p>如果您对本隐私政策有任何疑问或需要进一步了解您的个人信息，请通过以下方式联系我们：</p>
            <ul className='md:ml-8 ml-4'>
              {email && (
                <li className='list-disc'>
                  <p>
                    联系邮箱：[<a href={`mailto:${email}`}>{email}</a>]
                  </p>
                </li>
              )}
              {tel && (
                <li className='list-disc'>
                  <p>
                    联系电话：[<a href={`tel:${tel}`}>{tel}</a>]
                  </p>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
