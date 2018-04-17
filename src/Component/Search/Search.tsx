import * as React from 'react';
import './Search.css';

export function Search() {
  return (
    <section className="search">
      <div className="container clearfix">
        <form>
          <div className="search-col search-col-1 pull-left">
            <div className="form-group">
              <label className="form-label" htmlFor="origin">Origin</label>
              <input className="form-control" id="origin" type="text" placeholder="Leaving from"/>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="destination">Destination</label>
              <input className="form-control" id="destination" type="text" placeholder="Going to"/>
            </div>
          </div>

          <div className="search-col search-col-2 pull-left">
            <div className="form-group">
              <label className="form-label" htmlFor="outDate">Outward date</label>
              <input className="form-control" id="outDate" type="date" placeholder="Leaving on"/>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="returnDate">Return date</label>
              <input className="form-control" id="returnDate" type="date" placeholder="Returning on"/>
            </div>
          </div>

          <div className="search-col search-col-3 pull-left center">
            <div className="form-group">
              <label className="form-label" htmlFor="adult">Adult</label>
              <input className="form-control center" id="adult" type="number" value="1" min="0" max="9"/>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="child">Child</label>
              <input className="form-control center" id="child" type="number" value="0" min="0" max="9"/>
            </div>
          </div>

          <div className="search-col search-col-4 pull-left">
            <div className="form-group">
              <label className="form-label" htmlFor="child">Railcards</label>
              <select className="form-control">
                <option>16-25 Railcard</option>
                <option>Network Railcard</option>
              </select>
            </div>
          </div>

          <div className="search-col search-col-5 pull-left">
            <div className="form-group">
              <legend className="form-label">Filters</legend>
              <div className="form-group">
                <label className="form-label-radio">
                  <input type="radio" className="form-check-input" name="class" id="class1" value="Standard" checked={true}/>
                  Standard
                </label>
              </div>
              <div className="form-group">
                <label className="form-label-radio">
                  <input type="radio" className="form-check-input" name="class" id="class2" value="First"/>
                  First
                </label>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}