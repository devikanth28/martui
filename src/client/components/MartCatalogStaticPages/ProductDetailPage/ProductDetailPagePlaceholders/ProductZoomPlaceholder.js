import React from 'react'

const ProductZoomPlaceholder = () => {
  return (
    <div className='fluid p-4' style={{"background":"#fff"}}>
    <div class="p-0 ph-item ph-row">
        <div class="mb-0 ph-picture" style={{"height":"20rem", "width":"18rem" }}></div>
    </div>
    <div className='fluid__instructions'>
        <div className='fluid_description w-50 pl-4'>
            <div class="ph-row">
                <div class="mb-2 mt-2 ph-col-4"></div>
                <div class="mb-2 mt-2 ph-col-8 empty"></div>
                <div class="my-2 ph-col-12" style={{"height":"1.5rem"}}></div>
                <div class="my-2 ph-col-6"></div>
                <div class="my-2 ph-col-6 empty"></div>
                <div class="my-2 ph-col-6"></div>
                <div class="my-2 ph-col-6 empty"></div>
                <div class="my-2 ph-col-4 "></div>
                <div class="my-2 ph-col-8 empty"></div>
                <div class="my-2 ph-col-2 " style={{"height":"2.5rem"}}></div>
                <div class="m ml-2 my-2 ph-col-2" style={{"height":"2.5rem"}}></div>
            </div>
        </div>
        <div class="fluid_checkout w-25">
<div class="ml-lg-5 p-0 ph-row pl-5">
<div class="ml-5 my-2 ph-col-4" style={{"height":"2rem"}}></div>
<div class="ph-col-12" style={{"height":"1rem"}}></div>
<div class="ph-col-12"></div>
<div class="my-2 ph-col-12"></div>
</div>
<div class="ph-row p-o">
<div class="ml-5 my-2 ph-col-10" style={{"height":"2rem"}}></div>
<div class="ml-5 my-2 ph-col-10" style={{"height":"2rem"}}></div>
</div>
</div>
</div>
</div>
  )
}
export default ProductZoomPlaceholder