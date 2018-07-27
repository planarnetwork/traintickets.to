import * as React from 'react';

export function FAQPage() {
  return (
    <div>
      <dl className="faq-list" role="presentation">
        <div className="faq-item" role="presentation">
          <dt className="faq-question" role="heading" aria-level={3}>
            This is great, how can I help?
          </dt>
          <dd className="faq-answer" role="region">
            <p>
              Testing, providing (constructive) <a href="mailto:info@planar.network">feedback</a>, helping spread the word, and donating to <a href="https://etherscan.io/address/0xFb35234A74801463Fa171204ECE1064eeb01D7d1">0xFb35234A74801463Fa171204ECE1064eeb01D7d1</a> are all much appreciated.
            </p>
          </dd>
        </div>

        <div className="faq-item" role="presentation">
          <dt className="faq-question" role="heading" aria-level={3}>
            How can I buy a ticket?
          </dt>
          <dd className="faq-answer" role="region">
            <p>
              The dapp is currently running on Ropsten so a Ropsten account and <a href="https://metamask.io">MetaMask</a> are required to 
              complete purchases. If you are having trouble please ensure that your account is unlocked or contact <a href="mailto:info@planar.network">support</a>.
            </p>
          </dd>
        </div>

        <div className="faq-item" role="presentation">
          <dt className="faq-question" role="heading" aria-level={3}>
            How can I collect my ticket?
          </dt>
          <dd className="faq-answer" role="region">
            <p>
              This is currently a beta test and while it is connected to real rail industry systems you cannot collect your ticket yet.
              Once going live you will be able to collect your ticket from a TVM at almost all UK rail stations.
            </p>
          </dd>
        </div>

        <div className="faq-item" role="presentation">
          <dt className="faq-question" role="heading" aria-level={3}>
            What about electronic tickets?
          </dt>
          <dd className="faq-answer" role="region">
            <p>
              There are various ticketing standards in use in the UK. The most promising is the e-ticket standard, which makes use of a
              pkpass file. Unfortunately, coverage is quite low. As it is accepted in more places we will integrate it.
            </p>
          </dd>
        </div>

        <div className="faq-item" role="presentation">
          <dt className="faq-question" role="heading" aria-level={3}>
            How can I view tickets I have ordered?
          </dt>
          <dd className="faq-answer" role="region">
            <p>
              A ticket wallet is coming soon.
            </p>
          </dd>
        </div>

        <div className="faq-item" role="presentation">
          <dt className="faq-question" role="heading" aria-level={3}>
            When are you going live?
          </dt>
          <dd className="faq-answer" role="region">
            <p>
              Best estimate is early Q4 2018. The system itself is ready, but it needs to be accredited before it can retail real tickets.
            </p>
          </dd>
        </div>

        <div className="faq-item" role="presentation">
          <dt className="faq-question" role="heading" aria-level={3}>
            Why no Advance tickets?
          </dt>
          <dd className="faq-answer" role="region">
            <p>
              Advance tickets require integration with the National Reservation System (NRS). It would not be possible to return a full
              day's worth of timetables and fares With NRS's current performance levels. If you value cheap tickets more than full
              timetables, <a href="mailto:info@planar.network">shout at us loud enough</a> and we might make a change.
            </p>
          </dd>
        </div>

        <div className="faq-item" role="presentation">
          <dt className="faq-question" role="heading" aria-level={3}>
            Can I view the source code?
          </dt>
          <dd className="faq-answer" role="region">
            <p>
              Yes. Everything is available, from the frontend UI to the signing service and contract. You can see everything on the Planar
              Network <a href="https://www.github.com/planarnetwork">GitHub account</a>.
            </p>
          </dd>
        </div>

        <div className="faq-item" role="presentation">
          <dt className="faq-question" role="heading" aria-level={3}>
            Your journey planner is wonderful
          </dt>
          <dd className="faq-answer" role="region">
            <p>
              That's not a question, but thank you. We built it from the ground up to be fast, accurate and flexible. It's still a work in
              progress so if there are issues, please <a href="mailto:info@planar.network">let us know</a>.
            </p>
          </dd>
        </div>

        <div className="faq-item" role="presentation">
          <dt className="faq-question" role="heading" aria-level={3}>
            When is your ICO?
          </dt>
          <dd className="faq-answer" role="region">
            <p>
              In it's current form traintickets.to does not need it's own token so there is no plan for an ICO. It is built on top of the ERC-721
              standard so each ticket is it's own non-fungible token.
            </p>
          </dd>
        </div>
      </dl>
    </div>
  );
}