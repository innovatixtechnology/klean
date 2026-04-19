export const dynamic = "force-static";

export default function PrivacyPolicyPage() {
  const lastUpdated = "April 15, 2026";

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-primary/10 selection:text-primary">
      {/* Header Section */}
      <section className="pt-24 pb-12 px-6 lg:px-16 max-w-7xl mx-auto overflow-hidden text-center relative">
        <div className="absolute top-10 left-10 w-1/3 h-64 bg-primary/5 blur-[120px] rounded-full -translate-x-1/2 pointer-events-none" />
        <div className="absolute top-10 right-10 w-1/4 h-64 bg-blue-500/5 blur-[100px] rounded-full translate-x-1/2 pointer-events-none" />
        <div className="animate-slide-up relative z-10">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-gray-900">
            Privacy <span className="text-primary italic">Policy.</span>
          </h1>
          <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Your privacy is our priority. Learn how we handle your data with transparency and care.
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
                1. Introduction
              </h2>
              <p>
                Welcome to Klean Company. We are committed to protecting your personal information and your right to privacy. 
                If you have any questions or concerns about our policy, or our practices with regards to your personal 
                information, please contact us at our provided contact channels.
              </p>
            </div>

            {/* Sec 2 */}
            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-4">
                <span className="w-8 h-[2px] bg-primary"></span>
                2. Information We Collect
              </h2>
              <p className="mb-4">
                We collect personal information that you voluntarily provide to us when registering at the Services, expressing an 
                interest in obtaining information about us or our products and services, when participating in activities on the 
                Services or otherwise contacting us.
              </p>
              <ul className="list-disc pl-6 space-y-2 marker:text-primary">
                <li><strong className="text-gray-800">Personal Data:</strong> Name, phone number, email address, and home address for service delivery.</li>
                <li><strong className="text-gray-800">Payment Data:</strong> We collect data necessary to process your payment if you make purchases.</li>
                <li><strong className="text-gray-800">Usage Data:</strong> Information about how you interact with our website and application.</li>
              </ul>
            </div>

            {/* Sec 3 */}
            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-4">
                <span className="w-8 h-[2px] bg-primary"></span>
                3. How We Use Your Information
              </h2>
              <p>
                We use personal information collected via our Services for a variety of business purposes described below. 
                We process your personal information for these purposes in reliance on our legitimate business interests, 
                in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 marker:text-primary">
                <li>To facilitate account creation and logon process.</li>
                <li>To send you marketing and promotional communications.</li>
                <li>To fulfill and manage your orders and service requests.</li>
                <li>To request feedback and to contact you about your use of our Services.</li>
              </ul>
            </div>

            {/* Sec 4 */}
            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-4">
                <span className="w-8 h-[2px] bg-primary"></span>
                4. Data Security
              </h2>
              <p>
                We have implemented appropriate technical and organizational security measures designed to protect the security of any personal 
                information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure. 
                Although we will do our best to protect your personal information, transmission of personal information to and from our Services 
                is at your own risk.
              </p>
            </div>

            {/* Sec 5 */}
            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-4">
                <span className="w-8 h-[2px] bg-primary"></span>
                5. Your Privacy Rights
              </h2>
              <p>
                In some regions, you have certain rights under applicable data protection laws. These may include the right (i) to request 
                access and obtain a copy of your personal information, (ii) to request rectification or erasure; (iii) to restrict the processing 
                of your personal information; and (iv) if applicable, to data portability.
              </p>
            </div>

          </div>

          {/* Contact Section within Card */}
          <div className="mt-16 pt-10 border-t border-gray-100 bg-gray-50/50 -mx-10 md:-mx-16 -mb-10 md:-mb-16 p-10 md:p-16 rounded-b-[3rem]">
            <h3 className="text-xl font-black text-gray-900 mb-4">Questions about this policy?</h3>
            <p className="text-gray-600 mb-6">
              If you have questions or comments about this policy, you may email us or contact us by post.
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