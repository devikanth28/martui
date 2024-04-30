import React from 'react'
import DrugComposition from './DrugComposition'
import ProductinfoPlaceholder from './ProductDetailPagePlaceholders/ProductinfoPlaceholder'
const Productinfo = () => {
  return (
    <React.Fragment>
            <section className='shadow-none'>
            <div className="p-3 pt-4">
                <div id="over-test-section">
                    <div className="row margin-none medicine-info labproduct">
                        <div className="col-md-12">
                            <h5 className="heading">PRODUCT INFORMATION</h5>
                            <section>
                                <p>Milk is something which not only many children dislike but also few adults do not enjoy the taste of milk. However, milk is a great source of multiple necessary nutrients that the body requires in its daily basis. To give a yummy taste to your glass of milk and also provide 34 vital nutrients plus additional healthy ingredients like kesar and badam, the Complan Kesar Badam health drink was designed. It is a vegetarian product and the formulation is designed mainly as per Indian Recommended Dietary Allowances (RDA) and Complan has more than 52% milk solids.
                                    Complan is a health and nutrition brand which believes in balanced nutrition. The triple action milk protein of the Complan Kesar Badam supplements milk with growth support nutrients. Dry fruits are a great source of beneficial nutrients. This refill pack including pista and badam not only gives you those nutrients but also adds taste to the boring milk.
                                    Besides Kesar Badam, Complan is available in delicious flavours including Creamy Classic, Royale Chocolate, Pista Badam, Strawberry and Rich Kulfi.</p>
                            </section>
                            <section>
                                <h5>Benefits of Complan Pista Badam Health Drink
                                </h5>
                                <ul>
                                    <li>Provides 34 vital nutrients which helps in bridging the nutritional gap which inhibits the growth of kids</li>
                                    <li>1 glass of Complan provides protein equivalent to that of two glasses of milk</li>
                                    <li>A family drink which can be consumed by fussy kids and adults too</li>
                                    <li>Promotes 2 times faster growth or height and weight due to its 34 vital nutrients with adequate amounts of Calcium and Iron, and 100% protein from milk</li>
                                    <li>Iodine Iron and Vitamin B12 help improve memory and math ability</li>
                                    <li>The calcium and iron also help in brain development and in maintaining fluid balance.</li>
                                </ul>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
            <DrugComposition/>
            </section>
            <ProductinfoPlaceholder/>
        </React.Fragment>
  )
}
export default Productinfo
