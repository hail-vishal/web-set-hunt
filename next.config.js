/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXTAUTH_URL:process.env.NEXTAUTH_URL,
    JWT_SECRET:process.env.JWT_SECRET,
    START_TIME:process.env.START_TIME,
    END_TIME:process.env.END_TIME
  },
  images:{
    domains:['ik.imagekit.io/3j67hddeg','web-set-hunt.vercel.app']
  }
}

module.exports = nextConfig
