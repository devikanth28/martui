import React from 'react';
import NoteIconPath from '../../images/common/note-clr-icn.png';

const LabCheckoutInfoNote = () => {
    return (
        <React.Fragment>
            <section className="info-note">
                <div className="text-center">
                    <img src={NoteIconPath} alt="Note" />
                    <p>NOTE:</p>
                </div>
                 <ul className="m-0">
                    <li>Discounts offered may vary based on the status of your MedPlus Advantage Plan on the selected slot date.</li>
                </ul> 
            </section>
        </React.Fragment>
    )
}

export default LabCheckoutInfoNote;