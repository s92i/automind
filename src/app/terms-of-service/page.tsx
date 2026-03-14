import Header from "@/components/header";
import Footer from "@/modules/footer";

const TermsPage = () => {
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
              Terms &amp; Conditions
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              These Terms &amp; Conditions govern your access to and use of
              Automind. By creating an account or using the service, you agree
              to be bound by them.
            </p>
          </div>

          <div className="space-y-10 text-sm md:text-base leading-relaxed text-muted-foreground">
            <section>
              <h2 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                1. Overview
              </h2>
              <p>
                Automind is a workflow automation platform that lets you build,
                run, and monitor automated workflows and AI-powered agents. You
                are responsible for how you use Automind, including any data you
                send to or from connected services.
              </p>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                2. Eligibility
              </h2>
              <p>
                You may use Automind only if you are legally able to form a
                binding contract in your jurisdiction and are not barred from
                using similar services under applicable law. If you are using
                Automind on behalf of an organization, you represent that you
                have authority to bind that organization.
              </p>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                3. Accounts &amp; Security
              </h2>
              <p className="mb-2">
                You are responsible for maintaining the confidentiality of your
                account credentials and for all activity under your account. You
                must promptly notify us of any unauthorized use or suspected
                security incident.
              </p>
              <p>
                We may suspend or terminate access to protect the platform, our
                users, or to comply with legal obligations.
              </p>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                4. Acceptable Use
              </h2>
              <p className="mb-2">
                You agree not to misuse Automind. This includes, without
                limitation:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Breaking or attempting to break platform security</li>
                <li>
                  Abusing rate limits or attempting to overload our systems
                </li>
                <li>
                  Using Automind for illegal activities or to violate
                  others&apos; rights
                </li>
                <li>
                  Sending spam, malware, or harmful automated traffic to third
                  parties
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                5. Data &amp; Integrations
              </h2>
              <p className="mb-2">
                Automind connects to many third-party services. Your use of
                those services is governed by their own terms and privacy
                policies. You are responsible for obtaining any necessary
                rights, consents, and permissions to use data with Automind.
              </p>
              <p>
                We take reasonable measures to secure your data, but no system
                is perfectly secure. You should not use Automind for data that
                requires absolute security guarantees.
              </p>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                6. Billing &amp; Subscriptions
              </h2>
              <p className="mb-2">
                Paid plans and usage-based fees are described on our pricing
                page. By subscribing, you authorize us and our payment
                processors to charge you for applicable fees, taxes, and
                overages.
              </p>
              <p>
                We may adjust pricing or plan features from time to time. We
                will provide reasonable notice where required by law.
              </p>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                7. Intellectual Property
              </h2>
              <p className="mb-2">
                Automind retains all rights, title, and interest in and to the
                platform, including software, branding, and documentation. You
                retain ownership of your content and workflows.
              </p>
              <p>
                You grant us a limited license to process your content only as
                necessary to provide and improve the service.
              </p>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                8. Termination
              </h2>
              <p>
                You may stop using Automind at any time. We may suspend or
                terminate your access if you materially breach these Terms,
                create risk or possible legal exposure for us, or if we
                discontinue the service. Some provisions, such as limitations of
                liability and dispute resolution, will survive termination.
              </p>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                9. Disclaimers &amp; Limitation of Liability
              </h2>
              <p className="mb-2">
                Automind is provided on an “as is” and “as available” basis,
                without warranties of any kind, whether express or implied.
              </p>
              <p>
                To the maximum extent permitted by law, Automind will not be
                liable for any indirect, incidental, special, consequential, or
                punitive damages, or for any loss of profits or revenues,
                whether incurred directly or indirectly.
              </p>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                10. Changes to These Terms
              </h2>
              <p>
                We may update these Terms from time to time. When we do, we will
                revise the “Last updated” date and, where required, provide
                additional notice. Your continued use of Automind after changes
                take effect constitutes acceptance of the updated Terms.
              </p>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                11. Contact
              </h2>
              <p>
                If you have questions about these Terms, please contact us at{" "}
                <a
                  href="mailto:automind.app@gmail.com"
                  className="text-primary underline hover:opacity-80"
                >
                  automind.app@gmail.com
                </a>{" "}
                or through the contact form on our website.
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

export default TermsPage;
