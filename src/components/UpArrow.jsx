import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';

export const UpArrow = () => {
    const [showTopButton, setShowTopButton] = useState(false);

    // behavior를 인자로 받아서 맨 위로 스크롤 해준다.
    const handleScrollToTop = (behavior) => {
        window.scrollTo({top: 0, behavior: behavior});
    };

    useEffect(() => {
        // 페이지가 렌더링 되면 무조건 맨위로 스크롤 한다.
        handleScrollToTop('auto');
       
        const handleScroll = () => {
            // 일정 구간 스크롤이 내려가면 버튼을 보여준다.
            if (window.scrollY > window.outerHeight / 3) setShowTopButton(true);
            else setShowTopButton(false);
        };
      
        // window에 scroll 이벤트를 추가
        window.addEventListener('scroll', handleScroll);
      
        // 페이지를 벗어날 때 이벤트를 제거한다.
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
        
    }, []);

    return (
        <Container className='position-fixed' style={{ right: "3%", bottom: "50px", width: "fit-content" }}>
            {showTopButton && (
                <img 
                    src="/icon/arrow-up-circle.svg" 
                    alt="upArrow" 
                    width={60} 
                    onClick={() => handleScrollToTop('smooth')} 
                    style={{ cursor: "pointer" }}
                />
            )}
        </Container>
    );
};
