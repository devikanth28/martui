import { useEffect } from 'react';

function ScrollToTop({ history }) {
  useEffect(() => {
     const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    }
  }, []);

  return (null);
}

export default ScrollToTop;