import React from 'react'

const CategoryGhostImage = () => {
  return (
    <React.Fragment>
          <div className='pt-0 categories'>
              <div className='ph-row ph-item p-0 mb-2'>
                  <div className='ph-col-2' style={{ "height": "1rem" }}></div>
              </div>
              <ul className='pl-0 w-100'>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => {
                      return (
                          <li class="list-each-item pl-0 ">
                              <div class="ph-row ph-item p-0 ">
                                  <div class="mt-3 ph-col-4 w-100" style={{ "height": "1rem" }}></div>
                              </div>
                          </li>
                      )
                  })}
              </ul>
          </div>
    </React.Fragment>
  )
}

export default CategoryGhostImage