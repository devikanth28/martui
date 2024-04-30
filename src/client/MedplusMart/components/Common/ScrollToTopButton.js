import React, { useEffect, useState } from 'react';

const ScrollToTopButton = () => {

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', toggleVisible);
        return () => {
            window.removeEventListener('scroll', toggleVisible);
        }
    },[])

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setVisible(true)
        }
        else if (scrolled <= 300) {
            setVisible(false)
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };


    return (
        <button className={`${visible ? "d-block scrollToTop" : "d-none scrollToTop"}`} onClick={() => { scrollToTop() }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                <g id="topchevron_white_icon_18px" transform="translate(-762 -868.477)">
                    <rect id="Rectangle_4722" data-name="Rectangle 4722" width="18" height="18" transform="translate(762 868.477)" fill="none"></rect>
                    <path id="Path_23401" data-name="Path 23401" d="M60.371,465.782l-4.156,4.156a.942.942,0,0,0,1.332,1.332l3.49-3.48,3.491,3.491a.945.945,0,0,0,1.611-.666.936.936,0,0,0-.279-.666L61.7,465.782A.945.945,0,0,0,60.371,465.782Z" transform="translate(710.138 408.731)" fill="#fff"></path>
                </g>
            </svg>
        </button>
    );
}

export default ScrollToTopButton;