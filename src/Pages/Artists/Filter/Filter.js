import React from 'react';
import './Filter.css';

const Filter = ({ sortNewest, sortAlphabetically, sortByPopularity }) => (
  <section className="l-filter">
    <button className="filter-options" onClick={() => sortNewest()}>
        Newest
    </button>
    <button className="filter-options" onClick={() => sortAlphabetically()}>
        A-Z
    </button>
    <button className="filter-options" onClick={() => sortByPopularity()}>
        Most-Popular
    </button>
  </section>
  );

export default Filter;
