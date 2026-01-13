import React from 'react';
import InfoPageLayout from './InfoPageLayout';

const TermsOfServicePage: React.FC<{ onBackToHome: () => void }> = ({ onBackToHome }) => {
    return (
        <InfoPageLayout title="Terms of Service" onBackToHome={onBackToHome}>
            <p className="lead">Last updated: October 27, 2024</p>
            <p>
                Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the AI Resume Builder website (the "Service") operated by AI Resume Builder ("us", "we", or "our").
            </p>

            <h2>Accounts</h2>
            <p>
                When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service. You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.
            </p>

            <h2>Content</h2>
            <p>
                Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, or other material ("Content"). You are responsible for the Content that you post to the Service, including its legality, reliability, and appropriateness. By posting Content to the Service, you grant us the right and license to use, modify, publicly perform, publicly display, reproduce, and distribute such Content on and through the Service.
            </p>

            <h2>Intellectual Property</h2>
            <p>
                The Service and its original content (excluding Content provided by users), features, and functionality are and will remain the exclusive property of AI Resume Builder and its licensors.
            </p>

            <h2>Termination</h2>
            <p>
                We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.
            </p>

            <h2>Limitation of Liability</h2>
            <p>
                In no event shall AI Resume Builder, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
            </p>
            
            <h2>Changes</h2>
            <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>
        </InfoPageLayout>
    );
};

export default TermsOfServicePage;
