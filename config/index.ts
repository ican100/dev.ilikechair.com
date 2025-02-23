import { appid, version } from '../package.json'

const isDev = process.env.NODE_ENV === 'development'
const email = process.env.NEXT_PUBLIC_EMAIL || ''
const tel = process.env.NEXT_PUBLIC_TEL || ''
const graphqlUri = process.env.NEXT_PUBLIC_BASE_URL
const loginURL = process.env.NEXT_PUBLIC_LOGIN_URI

const company = '广州缘分平台信息科技有限公司'

const icp = '粤ICP备2020116257号'

export { appid, company, email, graphqlUri, icp, isDev, loginURL, tel, version }
