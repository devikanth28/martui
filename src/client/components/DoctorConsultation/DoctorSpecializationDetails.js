import React from 'react';
function DoctorSpecializationDetails(props) {
    return (
        <React.Fragment>
            <section className="doctor-specialization shadow-none">
                <h6>About Cardiology</h6>
                <p>
                    The term cardiology is derived from the Greek words “cardia,” which
                    refers to the heart and “logy” meaning “study of.” Cardiology is a
                    branch of medicine that concerns diseases and disorders of the heart,
                    which may range from congenital defects through to acquired heart
                    diseases such as coronary artery disease and congestive heart failure.
                </p>
                <section>
                    <h4><u>Symptoms of Cardiovascular disease</u></h4>
                    <ul>
                        <li>Chest tightness or pressure.</li>
                        <li>Difficulty catching your breath.</li>
                        <li>Dizziness or fainting.</li>
                        <li>Fatigue.</li>
                        <li>Fluid build up.</li>
                        <li>Heart palpitations (heart pounding or racing).</li>
                        <li>Pain or numbness in your legs or arms.</li>
                        <li>Abdominal pain, nausea, vomiting.</li>
                    </ul>
                </section>
            </section>
        </React.Fragment>
    )
}
export default DoctorSpecializationDetails