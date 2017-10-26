import React from 'react';
import './Filter.css'

const Filter = () => {
  return (
    <section className='l-filter'>
      <button className="filter-options">
        Newest
      </button>
      <button className="filter-options">
        A-Z
      </button>
      <button className="filter-options">
        Most-Popular
      </button>
    </section>
  )
}

export default Filter
