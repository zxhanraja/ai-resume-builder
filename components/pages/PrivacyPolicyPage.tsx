import React from 'react';
import InfoPageLayout from './InfoPageLayout';

const PrivacyPolicyPage: React.FC<{ onBackToHome: () => void }> = ({ onBackToHome }) => {
    return (
        <InfoPageLayout title="Privacy Policy" onBackToHome={onBackToHome}>
            <p className="lead">Last updated: October 27, 2024</p>
            <p>
                AI Resume Builder ("us", "we", or "our") operates the AI Resume Builder website (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
            </p>

            <h2>Information Collection and Use</h2>
            <p>
                We collect several different types of information for various purposes to provide and improve our Service to you.
            </p>
            <h3>Types of Data Collected</h3>
            <h4>Personal Data</h4>
            <p>
                While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to: Email address, First name and last name, Cookies and Usage Data.
            </p>
             <h4>Resume Data</h4>
            <p>
                To provide our core service, we collect and process the information you provide for your resume. This includes your work history, education, skills, and any other information you enter into our forms. We use this data solely to generate your resume and provide AI-powered suggestions.
            </p>
            
            <h2>Use of Data</h2>
            <p>
                AI Resume Builder uses the collected data for various purposes:
            </p>
            <ul>
                <li>To provide and maintain the Service</li>
                <li>To notify you about changes to our Service</li>
                <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
                <li>To provide customer care and support</li>
                <li>To provide analysis or valuable information so that we can improve the Service</li>
                <li>To monitor the usage of the Service</li>
                <li>To detect, prevent and address technical issues</li>
            </ul>

            <h2>Data Security</h2>
            <p>
                The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
            </p>

            <h2>Changes to This Privacy Policy</h2>
            <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
            </p>
        </InfoPageLayout>
    );
};

export default PrivacyPolicyPage;
