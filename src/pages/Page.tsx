import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

/** Chrome shared by every sub-page. */
const Page: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex flex-col min-h-screen bg-background text-foreground antialiased">
    <Header />
    <main className="flex-grow">{children}</main>
    <Footer />
  </div>
);

export default Page;
