import './globals.css'
import Providers from '@/redux/provider';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='body'>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
