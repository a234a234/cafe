import "./globals.css";

export const metadata = {
  title: "루나 카페 메뉴판",
  description: "루나 카페 메뉴와 커피 스탬프 쿠폰. 스탬프 10개를 모아보세요.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
