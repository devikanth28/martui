import React, { useEffect , useRef} from "react";

const TrackFooter = (props) => {
    const {setIsFooterVisible} = props;
    const footerRef = useRef(null);
    
    useEffect(()=>{
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                setIsFooterVisible(entry.isIntersecting);
            });
        
          });
          observer.observe(footerRef.current);

          return () => {
            if(footerRef.current) 
                { 
                    observer.unobserve(footerRef.current);
                }
            }
    },[footerRef]);

    return (
        <React.Fragment>
            <div ref={footerRef} id="footer-tracker">
                {props.children}
            </div>
        </React.Fragment>
    );
}
export default TrackFooter
