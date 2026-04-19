export const dynamic = "force-static";

export default function TermsOfServicePage() {
  const lastUpdated = "April 15, 2026";

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-primary/10 selection:text-primary">
      {/* Header Section */}
      <section className="pt-24 pb-12 px-6 lg:px-16 max-w-7xl mx-auto overflow-hidden text-center relative">
        <div className="absolute top-10 left-10 w-1/3 h-64 bg-primary/5 blur-[120px] rounded-full -translate-x-1/2 pointer-events-none" />
        <div className="absolute top-10 right-10 w-1/4 h-64 bg-blue-500/5 blur-[100px] rounded-full translate-x-1/2 pointer-events-none" />
        <div className="animate-slide-up relative z-10">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-gray-900">
            Terms of <span className="text-primary italic">Service.</span>
          </h1>
          <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Please read these terms carefully before using our platform and services.
          </p>
          <p className="text-sm text-gray-400 mt-4 tracking-widest uppercase font-bold">
            Last Updated: {lastUpdated}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="pb-32 px-6 lg:px-16 max-w-4xl mx-auto relative z-10">
        <div className="bg-white p-10 md:p-16 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100 animate-slide-up delay-200">
          
          <div className="space-y-12 text-gray-600 text-lg leading-relaxed font-medium">
            
            {/* Sec 1 */}
            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-4">
                <span className="w-8 h-[2px] bg-primary"></span>
                1. Agreement to Terms
              </h2>
              <p>
                These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf 
                of an entity (“you”) and Klean Company (“we,” “us” or “our”), concerning your access to and use of our website 
                as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise 
                connected thereto.
              </p>
            </div>

            {/* Sec 2 */}
            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-4">
                <span className="w-8 h-[2px] bg-primary"></span>
                2. User Representations
              </h2>
              <p className="mb-4">
                By using the Site, you represent and warrant that:
              </p>
              <ul className="list-disc pl-6 space-y-2 marker:text-primary">
                <li>All registration information you submit will be true, accurate, current, and complete.</li>
                <li>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
                <li>You have the legal capacity and you agree to comply with these Terms of Service.</li>
                <li>You are not a minor in the jurisdiction in which you reside.</li>
              </ul>
            </div>

            {/* Sec 3 */}
            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-4">
                <span className="w-8 h-[2px] bg-primary"></span>
                3. Services and Payments
              </h2>
              <p>
                We provide a platform for booking home and personal services. All pricing is subject to change at our discretion. 
                You agree to pay all charges at the prices then in effect for your purchases and you authorize us to charge your 
                chosen payment provider for any such amounts upon placing your order. We reserve the right to correct any errors 
                or mistakes in pricing, even if we have already requested or received payment.
              </p>
            </div>

            {/* Sec 4 */}
            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-4">
                <span className="w-8 h-[2px] bg-primary"></span>
                4. Prohibited Activities
              </h2>
              <p>
                You may not access or use the Site for any purpose other than that for which we make the Site available. 
                The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
              </p>
            </div>

            {/* Sec 5 */}
            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-4">
                <span className="w-8 h-[2px] bg-primary"></span>
                5. Modifications and Interruptions
              </h2>
              <p>
                We reserve the right to change, modify, or remove the contents of the Site at any time or for any reason at our sole 
                discretion without notice. However, we have no obligation to update any information on our Site. We will not be liable 
                to you or any third party for any modification, price change, suspension, or discontinuance of the Site.
              </p>
            </div>

          </div>

          {/* Contact Section within Card */}
          <div className="mt-16 pt-10 border-t border-gray-100 bg-gray-50/50 -mx-10 md:-mx-16 -mb-10 md:-mb-16 p-10 md:p-16 rounded-b-[3rem]">
            <h3 className="text-xl font-black text-gray-900 mb-4">Need Clarification?</h3>
            <p className="text-gray-600 mb-6">
              If you have any questions or require further clarification regarding these Terms of Service, please reach out.
            </p>
            <a href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              Contact Support
            </a>
          </div>

        </div>
      </section>
    </div>
  );
}