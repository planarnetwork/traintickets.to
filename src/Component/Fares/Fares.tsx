import * as React from 'react';
import './Fares.css';

export function Fares(props: FaresProps) {
  return (
    <section className="fares">
      <div className="container">
        <div className="fares-out">
          <h3 className="fares-title bold">OUTBOUND - London Charing Cross to Sevenoaks</h3>
          <ul className="fare-list clearfix">
            <li className="fare pull-left">
              <label className="fare-input center">
                <div className="fare-stations bold clearfix">
                  <span className="fare-station pull-left">CHX</span>
                  <span className="fare-station pull-right">SEV</span>
                </div>
                <div className="fare-times bold clearfix">
                  <time className="fare-time pull-left">06:30</time>
                  <time className="fare-time pull-right">06:30</time>
                </div>
                <p className="duration">36 mins</p>
                <p className="fare-ticket">Anytime Day Single with Child Flat Fare Single</p>
                <div className="fare-bottom">
                  <p className="fare-price bold">
                    <span className="pound">&#163;</span>63<span className="pence">.00</span>
                  </p>
                  <input type="radio" name="outward"/>
                </div>
              </label>
            </li>
            <li className="fare pull-left">
              <label className="fare-input center">
                <div className="fare-stations bold clearfix">
                  <span className="fare-station pull-left">CHX</span>
                  <span className="fare-station pull-right">SEV</span>
                </div>
                <div className="fare-times bold clearfix">
                  <time className="fare-time pull-left">05:32</time>
                  <time className="fare-time pull-right">06:27</time>
                </div>
                <p className="duration">55 mins</p>
                <p className="fare-ticket">Advance Single</p>
                <div className="fare-bottom">
                  <p className="fare-price bold">
                    <span className="pound">&#163;</span>63<span className="pence">.00</span>
                  </p>
                  <input type="radio" name="outward"/>
                </div>
              </label>
            </li>
          </ul>
        </div>
        <div className="fares-return">
          <h3 className="fares-title bold">RETURN - Sevenoaks to London Charing Cross</h3>
          <ul className="fare-list clearfix">
            <li className="fare pull-left">
              <label className="fare-input center">
                <div className="fare-stations bold clearfix">
                  <span className="fare-station pull-left">SEV</span>
                  <span className="fare-station pull-right">CHX</span>
                </div>
                <div className="fare-times bold clearfix">
                  <time className="fare-time pull-left">05:30</time>
                  <time className="fare-time pull-right">06:06</time>
                </div>
                <p className="duration">36 mins</p>
                <p className="fare-ticket">Anytime Day Single with Child Flat Fare Single</p>
                <div className="fare-bottom">
                  <p className="fare-price bold">
                    <span className="pound">&#163;</span>63<span className="pence">.00</span>
                  </p>
                  <input type="radio" name="outward"/>
                </div>
              </label>
            </li>
            <li className="fare pull-left">
              <label className="fare-input center">
                <div className="fare-stations bold clearfix">
                  <span className="fare-station pull-left">SEV</span>
                  <span className="fare-station pull-right">CHX</span>
                </div>
                <div className="fare-times bold clearfix">
                  <time className="fare-time pull-left">05:32</time>
                  <time className="fare-time pull-right">06:27</time>
                </div>
                <p className="duration">55 mins</p>
                <p className="fare-ticket">Advance Single</p>
                <div className="fare-bottom">
                  <p className="fare-price bold">
                    <span className="pound">&#163;</span>63<span className="pence">.00</span>
                  </p>
                  <input type="radio" name="outward"/>
                </div>
              </label>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}


export interface Fare {
  origin: string;
}

interface FaresProps {
  fares: Fare[]
}

