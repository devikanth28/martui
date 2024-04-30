import React from "react";
const UnderstandTestResults = () => {
  return (
    <React.Fragment>
      <section class="understanding-results">
        <h5 class="heading">How to interpret your test results</h5>
        <p> If you are a healthy individual and the test results are in the normal
          range, then the thyroid gland is functioning normally and there is no
          need for medical intervention.</p>

          <p> If you are a healthy individual and the test results are in the normal
          range, then the thyroid gland is functioning normally and there is no
          need for medical intervention.</p>

          <p>
          If the total thyroxine levels are above the normal range, it may be
          indicative of hyperthyroidism. Certain conditions such as Grave’s
          disease (an immune system disorder which results in the overproduction
          of thyroid hormones), thyroiditis (inflammation of the thyroid gland),
          toxic multinodular goiter, thyroid cancer, etc. may also be
          responsible for the increased levels of total thyroxine hormone in the
          blood.
        </p>
        <table>
          <thead>
            <tr>
            <th>Field 1</th>
            <th>Range</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Normal</td>
              <td>Below 5.7%</td>
            </tr>
            <tr>
              <td>Prediabetic</td>
              <td>5.7% - 6.4%</td>
            </tr>
            <tr>
              <td>Diabetic</td>
              <td>Above 6.5%</td>
            </tr>
          </tbody>
        </table>
      </section>
    </React.Fragment>
  );
};
export default UnderstandTestResults;
