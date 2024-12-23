/** @type {import('next').NextConfig} */

const nextConfig = {
  /* config options here */
  sassOptions: {
    includePaths: ['./src'],
    prependData: `@import "@/styles/variables.scss";`,
  }
};

export default nextConfig;
