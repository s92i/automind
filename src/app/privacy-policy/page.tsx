import Header from "@/components/header";
import Footer from "@/modules/footer";

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="pt-24 pb-20 px-6">
        <div className="container max-w-4xl mx-auto">
          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
              Legal
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              This Privacy Policy explains how Automind collects, uses, stores,
              and protects your information when you use our platform, website,
              and related services.
            </p>
          </div>

          <div className="space-y-10 text-sm md:text-base leading-relaxed text-muted-foreground">
            <section>
              <h2 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                1. Overview
              </h2>
              <p>
                Automind is a workflow automation platform that enables users to
                build, run, and monitor automations and AI-powered workflows.
                This Privacy Policy applies to personal information collected
                through our website, application, and related services.
              </p>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                2. Information We Collect
              </h2>
              <p className="mb-2">
                We may collect the following categories of information:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Account information such as your name, email address, company
                  name, and login credentials
                </li>
                <li>
                  Billing and subscription information needed to manage paid
                  plans and transactions
                </li>
                <li>
                  Workflow data, prompts, inputs, outputs, logs, and usage
                  history generated when using Automind
                </li>
                <li>
                  Technical information such as IP address, browser type, device
                  information, operating system, and interaction data
                </li>
                <li>
                  Communications you send to us through email, forms, or support
                  requests
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                3. How We Use Information
              </h2>
              <p className="mb-2">We use collected information to:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Provide, operate, and maintain Automind</li>
                <li>Authenticate users and secure accounts</li>
                <li>Process payments and manage subscriptions</li>
                <li>
                  Improve product performance, reliability, and user experience
                </li>
                <li>
                  Monitor usage, troubleshoot issues, and prevent abuse or fraud
                </li>
                <li>
                  Communicate with you about updates, support, legal notices, or
                  service-related matters
                </li>
                <li>
                  Comply with legal obligations and enforce our terms and
                  policies
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                4. Workflow Data &amp; Integrations
              </h2>
              <p className="mb-2">
                Automind may connect to third-party platforms and process data
                you choose to send through those integrations. You are
                responsible for ensuring that you have the necessary rights,
                permissions, and legal basis to use that data with Automind.
              </p>
              <p>
                We process workflow data to provide the requested functionality,
                maintain service performance, and improve our systems where
                permitted by law and our internal policies.
              </p>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                5. Sharing of Information
              </h2>
              <p className="mb-2">
                We do not sell your personal information. We may share
                information in the following situations:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  With service providers who help us operate the platform, such
                  as hosting, analytics, authentication, support, and payment
                  processors
                </li>
                <li>
                  With integrated third-party services when you choose to
                  connect and use them
                </li>
                <li>
                  When required by law, regulation, legal process, or
                  governmental request
                </li>
                <li>
                  To protect the rights, safety, security, and integrity of
                  Automind, our users, or the public
                </li>
                <li>
                  In connection with a merger, acquisition, financing, or sale
                  of assets, subject to appropriate safeguards
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                6. Data Retention
              </h2>
              <p>
                We retain personal information for as long as needed to provide
                the service, comply with legal obligations, resolve disputes,
                enforce agreements, and maintain legitimate business records.
                Retention periods may vary depending on the type of data and the
                purpose for which it was collected.
              </p>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                7. Security
              </h2>
              <p className="mb-2">
                We use reasonable administrative, technical, and organizational
                measures to protect your information against unauthorized
                access, loss, misuse, or disclosure.
              </p>
              <p>
                However, no method of transmission over the internet or method
                of storage is completely secure, and we cannot guarantee
                absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                8. Your Rights
              </h2>
              <p className="mb-2">
                Depending on your location and applicable law, you may have
                rights regarding your personal information, including the right
                to access, correct, delete, restrict, or object to certain
                processing, and the right to data portability.
              </p>
              <p>
                To exercise any applicable rights, please contact us using the
                details provided below. We may need to verify your identity
                before processing your request.
              </p>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                9. Cookies &amp; Analytics
              </h2>
              <p className="mb-2">
                We may use cookies and similar technologies to keep you signed
                in, remember preferences, measure usage, and improve platform
                performance.
              </p>
              <p>
                You can control certain cookie settings through your browser,
                though disabling some cookies may affect functionality.
              </p>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                10. International Data Processing
              </h2>
              <p>
                Your information may be processed and stored in countries other
                than your own. Where required, we take appropriate steps to
                ensure such transfers are subject to suitable safeguards and
                handled in accordance with applicable data protection laws.
              </p>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                11. Children&apos;s Privacy
              </h2>
              <p>
                Automind is not intended for children under the age required by
                applicable law to consent to digital services in their
                jurisdiction. We do not knowingly collect personal information
                from children in violation of applicable law.
              </p>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                12. Changes to This Privacy Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. When we do,
                we will revise the “Last updated” date and, where required,
                provide additional notice. Your continued use of Automind after
                any changes take effect constitutes acceptance of the updated
                Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                13. Contact
              </h2>
              <p>
                If you have questions about this Privacy Policy or want to
                exercise your privacy rights, please contact us at{" "}
                <a
                  href="mailto:automind.app@gmail.com"
                  className="text-primary underline hover:opacity-80"
                >
                  automind.app@gmail.com
                </a>
                .
              </p>
            </section>

            <p className="text-xs text-muted-foreground/80">
              Last updated: {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPage;
