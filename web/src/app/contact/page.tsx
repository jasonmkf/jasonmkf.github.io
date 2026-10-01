import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { APP_STORE_DEVELOPER, PLAY_DEVELOPER, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Contact KF Production',
  description:
    'Contact KF Production for support or business enquiries about our calendar and calculator ' +
    'apps: jasonmkf2@gmail.com.',
  path: '/contact/',
  absoluteTitle: true,
});

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="relative overflow-hidden bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-900 text-white py-20">
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-purple-300">
                KF Production
              </p>
              <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
                Contact Us
              </h1>
              <p className="mt-4 text-xl text-purple-200">
                We&apos;d love to hear from you
              </p>
            </div>
          </div>
        </div>
        
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
                
                <div className="text-center">
                  <p className="text-gray-600 mb-6">
                    Thank you for your interest in KF Production. For any inquiries or support requests, please connect with us through the following channels:
                  </p>
                  
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-purple-50 p-6 rounded-lg">
                      <div className="flex justify-center mb-4">
                        <svg className="h-8 w-8 text-purple-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-purple-900 mb-2">Email Us</h3>
                      <p className="text-gray-600 mb-4">For business inquiries or support</p>
                      <a href="mailto:jasonmkf2@gmail.com" className="text-purple-800 font-medium hover:underline">
                        jasonmkf2@gmail.com
                      </a>
                    </div>
                    
                    <div className="bg-purple-50 p-6 rounded-lg">
                      <div className="flex justify-center gap-3 mb-4">
                        <svg className="h-8 w-8 text-purple-800" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3.609 1.814L13.792 12 3.609 22.186c-.181-.181-.301-.406-.301-.663V2.477c0-.257.12-.482.301-.663zm10.831 10.309l2.128-2.127L21.382 12l-4.814 2.004-2.128-2.127 1.749-1.749-10.836 6.155 9.087-5.156zm7.34-6.497l-2.066 1.066-2.127 2.127L7.298 3.322l10.289 5.301 4.193-2.997zM7.302 20.677l10.288-5.3-2.127-2.128-8.161 7.428z" />
                        </svg>
                        <svg className="h-8 w-8 text-purple-800" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-purple-900 mb-2">Follow Us</h3>
                      <p className="text-gray-600 mb-4">Check out our apps on Google Play and the App Store</p>
                      <div className="flex flex-wrap items-center justify-center gap-3">
                        <a
                          href={PLAY_DEVELOPER}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block hover:opacity-90 transition-opacity"
                        >
                          <Image
                            src="/google-play-badge.png"
                            alt="View All Apps on Google Play"
                            width={270}
                            height={80}
                            className="w-[170px] h-auto"
                          />
                        </a>
                        <a
                          href={APP_STORE_DEVELOPER}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block hover:opacity-90 transition-opacity"
                        >
                          <Image
                            src="/app-store-badge.svg"
                            alt="View All Apps on the App Store"
                            width={120}
                            height={40}
                            className="w-[170px] h-auto"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
} 