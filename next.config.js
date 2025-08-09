/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Static HTML export
  images: { unoptimized: true }, // 이미지 최적화 비활성화
  basePath: "", // 하위 경로 없으면 빈 문자열
};
module.exports = nextConfig;
