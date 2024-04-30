import React, { useState } from 'react'
import { searchAll } from '../HomePage/staticData'
import Compositions from './Compositions'
import SearchAllProduct from './SearchAllProduct'
const SearchAll = () => {
  return (
      <React.Fragment>
      <div className='row'>
        <div className='col-8'>
            <SearchAllProduct data={searchAll} />
        </div>
        <div className='col-4 pl-0'>
          <Compositions />
        </div>
      </div>
    </React.Fragment>
  )
}

export default SearchAll