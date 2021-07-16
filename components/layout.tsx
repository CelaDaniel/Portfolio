import { ReactNode } from 'react';

import Meta from '@/components/meta';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

const Layout = ({ children }: { children: ReactNode }) => (
  <div id="top" className="bg-white dark:bg-black">
    <Meta />
    <Navbar />
    <main className="flex flex-col justify-center px-8 bg-white dark:bg-black">
      {children}
      <Footer></Footer>
    </main>
  </div>
);

export default Layout;
