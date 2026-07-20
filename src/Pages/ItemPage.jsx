import React from 'react'
import Navbar from '../Components/Navbar'

const ItemPage = () => {
  return (
    <div className='itempage'>
      <Navbar/>
      <div className="itempage-content">
        <table>
          <thead>
          <tr>
            <th>Sr</th>
            <th>Item Name</th>
            <th>Item Category</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Price</th>
            <th>Stock Level</th>
            <th>Actions</th>
          </tr>
          </thead>
        </table>
      </div>
    </div>
  )
}

export default ItemPage
