import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>1. Introduction</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Study Spark ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our educational platform.
                </p>
                <p>
                  Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site or use our services.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Information We Collect</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>
                <p>
                  We collect information that you voluntarily provide to us when you register on the platform, including:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Name and email address</li>
                  <li>Account credentials (encrypted password)</li>
                  <li>Profile information (optional)</li>
                  <li>Educational preferences and goals</li>
                </ul>

                <h3 className="text-lg font-semibold text-foreground mt-4">Usage Data</h3>
                <p>
                  We automatically collect certain information when you visit, use, or navigate the platform:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Study progress and quiz results</li>
                  <li>Study planner entries and task completion</li>
                  <li>AI assistant conversation history (for improving service)</li>
                  <li>Device and browser information</li>
                  <li>IP address and location data</li>
                  <li>Usage patterns and preferences</li>
                </ul>

                <h3 className="text-lg font-semibold text-foreground mt-4">Educational Content</h3>
                <p>
                  We collect and store:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Notes and study materials you create</li>
                  <li>Quiz attempts and answers</li>
                  <li>Questions you ask the AI assistant</li>
                  <li>Study plans and schedules</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. How We Use Your Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>We use the information we collect to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide, operate, and maintain our educational platform</li>
                  <li>Personalize your learning experience</li>
                  <li>Improve and optimize our AI assistant</li>
                  <li>Track your study progress and achievements</li>
                  <li>Send you important updates and notifications</li>
                  <li>Respond to your inquiries and provide support</li>
                  <li>Analyze usage patterns to improve our services</li>
                  <li>Detect and prevent fraud or abuse</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. How We Share Your Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  We do not sell your personal information. We may share your information in the following situations:
                </p>
                
                <h3 className="text-lg font-semibold text-foreground">Service Providers</h3>
                <p>
                  We may share your information with third-party service providers who perform services on our behalf, including:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Cloud hosting and data storage</li>
                  <li>AI and machine learning services</li>
                  <li>Analytics and performance monitoring</li>
                  <li>Email delivery services</li>
                </ul>

                <h3 className="text-lg font-semibold text-foreground mt-4">Legal Requirements</h3>
                <p>
                  We may disclose your information if required to do so by law or in response to valid requests by public authorities.
                </p>

                <h3 className="text-lg font-semibold text-foreground mt-4">Business Transfers</h3>
                <p>
                  If we are involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Data Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  We implement appropriate technical and organizational security measures to protect your personal information:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Secure authentication and password protection</li>
                  <li>Regular security audits and updates</li>
                  <li>Restricted access to personal information</li>
                  <li>Secure backup and recovery procedures</li>
                </ul>
                <p className="mt-4">
                  However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee absolute security.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Your Data Rights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>You have the following rights regarding your personal information:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                  <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal obligations)</li>
                  <li><strong>Data Portability:</strong> Request a copy of your data in a machine-readable format</li>
                  <li><strong>Objection:</strong> Object to our processing of your personal information</li>
                  <li><strong>Restriction:</strong> Request restriction of processing in certain circumstances</li>
                </ul>
                <p className="mt-4">
                  To exercise these rights, please contact us through our <Link to="/support" className="text-primary hover:underline">support page</Link>.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Data Retention</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  We retain your personal information for as long as necessary to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide our services to you</li>
                  <li>Comply with legal obligations</li>
                  <li>Resolve disputes and enforce our agreements</li>
                </ul>
                <p className="mt-4">
                  When you delete your account, we will delete or anonymize your personal information, except where we are required to retain it by law.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Children's Privacy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  While our service is educational, it is intended for users aged 13 and older. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe we have collected information from a child under 13, please contact us immediately.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>9. Cookies and Tracking</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  We use cookies and similar tracking technologies to track activity on our platform and store certain information. Cookies are files with small amounts of data that may include an anonymous unique identifier.
                </p>
                <p>
                  You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>10. Third-Party Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Our platform may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to read the privacy policies of any third-party sites you visit.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>11. International Data Transfers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Your information may be transferred to and maintained on servers located outside of your country where data protection laws may differ. By using our service, you consent to such transfers.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>12. Changes to This Privacy Policy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                </p>
                <p>
                  You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>13. Contact Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  If you have any questions about this Privacy Policy, please contact us through our <Link to="/support" className="text-primary hover:underline">support page</Link>.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;
