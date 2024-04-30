import React, { useEffect, useState , useRef} from "react";

const FadeInSection = (props) => {
    const [isVisible, setVisible] = useState(false);
    const domRef = useRef(null);
    useEffect(()=>{
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    setVisible(entry.isIntersecting)
                }
            });
        
          });
          observer.observe(domRef.current);
          return () => {
            if(domRef.current) 
                { 
                    observer.unobserve(domRef.current);
                }
            }
    },[domRef])
    return (<React.Fragment>
        <div className={`${isVisible ? 'fadeIn custom-fadeIn-image' : ''}`} ref={domRef}>
            {props.children}
        </div>
    </React.Fragment>)
}
export default FadeInSection
