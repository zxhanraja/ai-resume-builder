import React from 'react';
import InfoPageLayout from './InfoPageLayout';

const ContactPage: React.FC<{ onBackToHome: () => void }> = ({ onBackToHome }) => {
    return (
        <InfoPageLayout title="Contact Us" onBackToHome={onBackToHome}>
            <p className="lead">
                Have questions, feedback, or need support? We'd love to hear from you. Please reach out to us through one of the methods below, or fill out the contact form.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
                <div>
                    <h3 className="text-xl font-bold mb-2">General Inquiries</h3>
                    <p>For general questions about our platform.</p>
                    <a href="mailto:support@airesumebuilder.com" className="text-brand-yellow font-semibold">support@airesumebuilder.com</a>
                </div>
                 <div>
                    <h3 className="text-xl font-bold mb-2">Partnerships</h3>
                    <p>Interested in partnering with us?</p>
                    <a href="mailto:partners@airesumebuilder.com" className="text-brand-yellow font-semibold">partners@airesumebuilder.com</a>
                </div>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-slate-300">Full Name</label>
                    <input type="text" id="name" className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-md shadow-sm focus:outline-none focus:ring-brand-yellow focus:border-brand-yellow" />
                </div>
                 <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-slate-300">Email Address</label>
                    <input type="email" id="email" className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-md shadow-sm focus:outline-none focus:ring-brand-yellow focus:border-brand-yellow" />
                </div>
                 <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-slate-300">Message</label>
                    <textarea id="message" rows={5} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-md shadow-sm focus:outline-none focus:ring-brand-yellow focus:border-brand-yellow"></textarea>
                </div>
                <div>
                    <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-brand-yellow hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-yellow">
                        Send Message
                    </button>
                </div>
            </form>
        </InfoPageLayout>
    );
};

export default ContactPage;
