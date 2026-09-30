import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'About KF Production',
  description:
    'KF Production has made Android and iOS apps since 2015: holiday calendars built around ' +
    'local holidays, languages and traditions, and everyday tools such as loan calculators.',
  path: '/about/',
  absoluteTitle: true,
});

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="relative overflow-hidden bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-900 py-20">
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-purple-300">
              KF Production
            </p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              About KF Production
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-purple-200">
              Simplifying life, one app at a time
            </p>
          </div>
        </div>
        
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">Our Story</h2>
                <p className="mt-4 text-lg text-gray-600">
                  Founded in 2015, KF Production has been dedicated to creating Android and iOS applications that make everyday life more convenient. We believe that technology should simplify tasks, not complicate them.
                </p>
                <p className="mt-4 text-lg text-gray-600">
                  Our team focuses on developing user-friendly apps that solve real-world problems. From calendar applications to financial calculators, our products are designed with simplicity and functionality in mind.
                </p>
                <p className="mt-4 text-lg text-gray-600">
                  We&apos;re proud to have helped thousands of users simplify their daily routines through our thoughtfully designed applications.
                </p>
              </div>
              <div className="relative h-64 lg:h-96">
                <Image
                  src="/kf-production-logo.png"
                  alt="KF Production Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
              <p className="mt-4 max-w-2xl lg:mx-auto text-lg text-gray-600">
                To create applications that make everyday tasks simpler and more efficient, enhancing the digital experience for our users.
              </p>
            </div>
            
            <div className="mt-12">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <div className="pt-6">
                  <div className="flow-root bg-white rounded-lg px-6 pb-8">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-purple-800 rounded-md shadow-lg">
                          <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                          </svg>
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Accessibility</h3>
                      <p className="mt-5 text-base text-gray-500">
                        We strive to make our apps accessible to everyone, regardless of their technical knowledge or background.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-6">
                  <div className="flow-root bg-white rounded-lg px-6 pb-8">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-purple-800 rounded-md shadow-lg">
                          <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Quality</h3>
                      <p className="mt-5 text-base text-gray-500">
                        We are committed to delivering high-quality applications that are reliable, efficient, and free from bugs.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-6">
                  <div className="flow-root bg-white rounded-lg px-6 pb-8">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-purple-800 rounded-md shadow-lg">
                          <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                          </svg>
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Innovation</h3>
                      <p className="mt-5 text-base text-gray-500">
                        We continuously explore new ideas and technologies to improve our apps and provide better solutions.
                      </p>
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