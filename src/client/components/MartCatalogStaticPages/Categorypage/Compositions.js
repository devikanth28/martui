import React from 'react'

const Compositions = () => {
  const compositionData=[
        "Paracetamol 325 MG+Tramadol 37.5 MG",
        "Paracetamol 250 MG /5ML",
        "Paracetamol 500 MG+Thiocolchicoside 4 MG",
        "Paracetamol 500 MG+Pheniramine maleate 12.5 MG",
        "Paracetamol 240 MG /5ML",
        "Paracetamol 120 MG /5ML",
        "Paracetamol 100 MG /5ML",
        "Paracetamol 325 MG+Tramadol 37.5 MG",
        "Paracetamol 325 MG+Tramadol 37.5 MG",
        "Paracetamol 325 MG+Tramadol 37.5 MG",
        "Paracetamol 325 MG+Tramadol 37.5 MG",
        "Paracetamol 325 MG+Tramadol 37.5 MG",
        "Paracetamol 325 MG+Tramadol 37.5 MG"
    ]
  
  return (
      <React.Fragment>
              <section>
          <div className='page-header'>
              <h3 className='font-weight-normal p-2'>Matching Compositions</h3>
          </div>
          <table className='table table-condensed table-striped'>
          <thead className='table-dark'>
				<tr className="">
					<th className='text-light'>Composition Name</th>
				</tr>
			</thead>
            <tbody>
                {compositionData.map((eachComposition)=>{
                    return(
                        <React.Fragment>
                            <tr>
                                <td>
                                    <a href='javascript:void(0)' className="text-dark" title={eachComposition}>{eachComposition}</a>
                                </td>
                            </tr>
                        </React.Fragment>
                    )
                })}
                
            </tbody>
          </table>
          <nav aria-label="Page navigation example">
              <ul class="pagination">
                  <li class="page-item">
                      <button class="page-link" href="#" aria-label="Previous">
                          <span aria-hidden="true">&laquo;</span>
                      </button>
                  </li>
                          <li class="page-item"><button class="page-link" href="#">1</button></li>
                  <li class="page-item">
                      <button class="page-link" href="#" aria-label="Next">
                          <span aria-hidden="true">&raquo;</span>
                      </button>
                  </li>
              </ul>
          </nav>
          </section>
      </React.Fragment>
  )
}

export default Compositions