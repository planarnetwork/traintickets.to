import * as React from 'react';

export function AboutPage() {
  return (
    <section className="faqs">
      <h2 className="page-title">About</h2>
      <div className="container">
        <div className="row">
          <div className="col-md-18 offset-md-3 col-lg-14 offset-lg-5">
            <h3 className="page-subtitle">What is traintickets.to?</h3>
            <div className="page-text">
              <p>
                Traintickets.to is the first rail ticketing system built on a blockchain. It uses an <a className="external" href="https://ethereum.org/">Ethereum</a> smart
                contract to retail and store train tickets for all UK operators.
              </p>
              <p>
                Purchases through traintickets.to are made using Ether, Ethereum's in-built currency. <a className="external" href="https://www.metamask.io">MetaMask</a> is
                required to complete transactions.
              </p>
              <p>
                The traintickets.to smart contract is an implementation of the <a className="external" href="http://erc721.org/">ERC-721 standard</a>. Each ticket is a
                non-fungible token that can be sold or transferred between addresses.
              </p>
              <p>
                It's currently in beta and operating on the <a className="external" href="https://ropsten.etherscan.io/">Ropsten network</a>. It is also connected to test
                versions of industry systems, so any tickets retailed will not be available for collection at the station.
              </p>
              <p>
                Traintickets.to is part of the <a className="external" href="https://planar.network/">Planar Network</a>, a wider programme to provide integrated transport
                ticketing through blockchain technology.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}