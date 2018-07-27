import * as React from 'react';

export function FAQPage() {
  return (
    <div>
      <h3>How can I buy a ticket?</h3>
      <p>
        The dapp is currently running on Ropsten so a Ropsten account and <a href="https://metamask.io">MetaMask</a> are required to
        complete purchases. If you are having trouble please ensure that your account is unlocked or contact <a href="mailto:info@planar.network">support</a>.
      </p>
      <h3>How can I collect my ticket?</h3>
      <p>
        This is currently a beta test and while it is connected to real rail industry systems you cannot collect your ticket yet.
        Once going live you will be able to collect your ticket from a TVM at almost all UK rail stations.
      </p>
      <h3>What about electronic tickets?</h3>
      <p>
        There are various ticketing standards in use in the UK. The most promising is the e-ticket standard, which makes use of a
        pkpass file. Unfortunately, coverage is quite low. As it is accepted in more places we will integrate it.
      </p>
      <h3>How can I view tickets I have ordered?</h3>
      <p>
        A ticket wallet is coming soon.
      </p>
      <h3>When are you going live?</h3>
      <p>
        Best estimate is early Q4 2018. The system itself is ready, but it needs to be accredited before it can retail real tickets.
      </p>
      <h3>Why no Advance tickets?</h3>
      <p>
        Advance tickets require integration with the National Reservation System (NRS). It would not be possible to return a full
        day's worth of timetables and fares With NRS's current performance levels. If you value cheap tickets more than full
        timetables, <a href="mailto:info@planar.network">shout at us loud enough</a> and we might make a change.
      </p>
      <h3>Can I view the source code?</h3>
      <p>
        Yes. Everything is available, from the frontend UI to the signing service and contract. You can see everything on the Planar
        Network <a href="https://www.github.com/planarnetwork">GitHub account</a>.
      </p>
      <h3>Your journey planner is wonderful</h3>
      <p>
        That's not a question, but thank you. We built it from the ground up to be fast, accurate and flexible. It's still a work in
        progress so if there are issues, please <a href="mailto:info@planar.network">let us know</a>.
      </p>
    </div>
  );
}