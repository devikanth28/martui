import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDecodedURL } from "../../../../helpers/CommonUtil";
import Validate from "../../../../helpers/Validate";
import NoProductsFound from "../../Common/NoProductsFound";

const CompositionSearchResult = (props)=> {

    const [compositionsPageNo,setCompositionPageNo] = useState(1);
    const [pages,setPages] = useState(()=>{
        const compositionsCount = props.compositions?.length;
        return (
            [...Array(compositionsCount/20 >=5 ? 5 : Math.ceil(compositionsCount/20) ).keys()].map(each=>each+1)
            );
    });
    const validate = Validate();
  
     useEffect(()=>{
         window.scrollTo({top: 0, behavior: 'smooth'});
     },[compositionsPageNo])


    const updatePageNo = (isNextClick)=> {
        if(isNextClick && (compositionsPageNo)*20<props.compositions.length) {
            setCompositionPageNo(compositionsPageNo+1);
            if(!pages.includes(compositionsPageNo)){
          setPages([...pages.map(each=>each+1)]);
            }
  
        }
        if(!isNextClick && (compositionsPageNo-1)*20>0) {
            setCompositionPageNo(compositionsPageNo-1);
            if(!pages.includes(compositionsPageNo-1)){
          setPages([...pages.map(each=>each-1)]);
            }
  
        }
    }

  return (
      <React.Fragment>
          <div>
              <h5 className='my-2'>Matching Compositions</h5>
          </div>
              <section>
          {props?.compositions?.length==0 &&
            <NoProductsFound showrequest={false} message ={"No Composition Found"}/>
           }
          {props?.compositions?.length>0 &&
          <React.Fragment>
            <table className='table table-condensed table-striped'>
          <thead className='table-dark'>
				<tr className="">
					<th className='text-light'>Composition Name</th>
				</tr>
			</thead>
            <tbody>
                {[...props?.compositions?.slice((compositionsPageNo-1)*20,(compositionsPageNo)*20)].map(({compositionId_s,compositionName_s,id_s}) => {
                    return(
                        <React.Fragment key={id_s}>
                            <tr>
                                <td>
                                    <Link to={`/compositionProducts/${getDecodedURL(compositionName_s)}/${compositionId_s}`} className="text-dark" title={compositionName_s}>{compositionName_s}</Link>
                                </td>
                            </tr>
                        </React.Fragment>
                    )
                })}
                
            </tbody>
          </table>
          <nav aria-label="Page navigation example" className="pagination-component">
              <ul class="pagination">
                  <li class="page-item">
                      <button class="page-link" href="#" aria-label="Previous" onClick ={()=>{updatePageNo(false)}} >
                          <span aria-hidden="true">&laquo;</span>
                      </button>
                  </li>
                    {pages.map((index) => {
                     return (<li class="page-item"><button class="page-link" className={`page-link ${compositionsPageNo==index ? 'active-button' : ''}`} onClick={()=>{setCompositionPageNo(index)}} href="#">{index}</button></li>);
                         })
                    }
                  <li class="page-item">
                      <button class="page-link" href="#" aria-label="Next" onClick ={()=>{updatePageNo(true)}} >
                          <span aria-hidden="true">&raquo;</span>
                      </button>
                  </li>
              </ul>
          </nav>
          </React.Fragment>}
          </section>
      </React.Fragment>
  )
}

export default CompositionSearchResult;


