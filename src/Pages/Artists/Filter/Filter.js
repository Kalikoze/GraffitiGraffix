import React from 'react';
import './Filter.css'

const Filter = ({sortNewest, sortAlphabetically}) => {
  return (
    <section className='l-filter'>
      <button className="filter-options" onClick={() => sortNewest()}>
        Newest
      </button>
      <button className="filter-options" onClick={() => sortAlphabetically()}>
        A-Z
      </button>
      <button className="filter-options">
        Most-Popular
      </button>
    </section>
  )
}

export default Filter
