import Link from 'next/link'

export default function PrivacyPolicyPage() {
    return (
        <div className="bg-accent flex justify-center">
            <div className="w-full p-4 my-4 mx-4 md:mx-0 md:w-[700px] border shadow-sm rounded-md bg-background text-foreground">
                <h1 className="font-medium text-lg text-center">
                    Privacy Policy
                </h1>
                <p>Date: Tue Oct 01 2024</p>

                <h2 className="my-2 font-medium text-lg">
                    1. Information We Collect
                </h2>
                <p>
                    When you use our service, we may collect the following
                    information:
                </p>
                <ul>
                    <li>
                        <strong>Resumes/Files:</strong> The documents you upload
                        to be translated.
                    </li>
                    <li>
                        <strong>Personal Information:</strong> Contact
                        information such as your name, email address, and any
                        details included in the resume you upload.
                    </li>
                </ul>

                <h2 className="my-2 font-medium text-lg">
                    2. How We Use Your Information
                </h2>
                <p>We use the information we collect to:</p>
                <ul>
                    <li>
                        <strong>Provide Services:</strong> Translate the resumes
                        you submit into the selected language.
                    </li>
                    <li>
                        <strong>Support Requests:</strong> Respond to customer
                        service inquiries or support issues.
                    </li>
                </ul>

                <h2 className="my-2 font-medium text-lg">
                    3. Data Retention and Deletion
                </h2>
                <ul>
                    <li>
                        <strong>Uploaded Resumes:</strong> Resumes you upload
                        are stored temporarily to complete the translation. Once
                        the translation is complete, we will store your resume
                        for future access unless you choose to delete it.
                    </li>
                    <li>
                        <strong>Document Removal:</strong> You can delete any
                        uploaded document at any time. When you do, the document
                        will be permanently removed from our storage systems.
                    </li>
                    <li>
                        <strong>Retention Period:</strong> We retain your
                        personal data only for as long as necessary to fulfill
                        the purposes described in this policy or as required by
                        law.
                    </li>
                </ul>

                <h2 className="my-2 font-medium text-lg">
                    4. Data Sharing and Disclosure
                </h2>
                <p>
                    We do not sell, trade, or share your personal information
                    with third parties, except in the following cases:
                </p>
                <ul>
                    <li>
                        <strong>Legal Compliance:</strong> We may disclose your
                        information to comply with legal obligations, enforce
                        our policies, or protect our rights.
                    </li>
                </ul>

                <h2 className="my-2 font-medium text-lg">5. Your Rights</h2>
                <p>You have the right to:</p>
                <ul>
                    <li>
                        <strong>Access Your Data:</strong> Request details on
                        the personal information we hold about you.
                    </li>
                    <li>
                        <strong>Delete Your Data:</strong> Request the deletion
                        of your personal data, including resumes and documents
                        uploaded.
                    </li>
                    <li>
                        <strong>Withdraw Consent:</strong> Revoke any consent
                        you’ve given regarding the processing of your data.
                    </li>
                </ul>

                <h2 className="my-2 font-medium text-lg">6. Security</h2>
                <p>
                    We implement appropriate security measures to protect your
                    personal information from unauthorized access, disclosure,
                    or loss. However, please note that no method of transmission
                    over the internet is entirely secure, and we cannot
                    guarantee absolute security.
                </p>

                <h2 className="my-2 font-medium text-lg">
                    7. Changes to This Policy
                </h2>
                <p>
                    We reserve the right to update this Privacy Policy as
                    needed. Changes will be communicated through the app, and
                    your continued use of the app constitutes acceptance of any
                    revisions.
                </p>

                <h2 className="my-2 font-medium text-lg">8. Contact Us</h2>
                <p>
                    If you have any questions or concerns regarding this Privacy
                    Policy, please contact us at{" "}
                    <Link
                        href={'mailto:matheuspimentel910@gmail.com'}
                        className="hover:underline underline-offset-4"
                    >
                        matheuspimentel910@gmail.com
                    </Link>
                </p>
            </div>
        </div>
    )
}
