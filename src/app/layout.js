import './globals.css';
import Head from 'next/head';
export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <Head>
        {/* Preload custom fonts */}
        {['Black', 'Bold', 'Light', 'Medium', 'Regular', 'Thin'].map(weight => (
          <link
            key={weight}
            rel="preload"
            href={`/fonts/YekanBakhFaNum-${weight}.woff`}
            as="font"
            type="font/woff"
            crossOrigin="anonymous"
          />
        ))}
      </Head>
      <body className="overflow-y-scroll">
        {children}
      </body>
    </html>
  );
}
