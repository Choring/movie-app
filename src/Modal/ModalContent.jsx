import React from 'react';
import './ModalContent.style.css';
import YouTube from 'react-youtube';

export const ModalContent = ({ onClose, videoKey }) => {
    
    return (
        <div>
            <div className="modal-overlay" onClick={onClose}></div>
            <div className="movie-modal" style={{zIndex:"9999"}}>
              <div className='video-container'>
                  <div className='d-flex justify-content-end '>
                    <button className='x-btn' onClick={onClose}>X</button>
                  </div>
                  <YouTube
                    videoId={videoKey}
                    opts={{
                      width: "100%",
                      height: "auto",
                      playerVars: {
                        autoplay: 1, //자동재생 O
                        rel: 0, //관련 동영상 표시하지 않음 (근데 별로 쓸모 없는듯..)
                        modestbranding: 1, // 컨트롤 바에 youtube 로고를 표시하지 않음
                      },
                    }}
                    //이벤트 리스너 
                    onEnd={(e)=>{e.target.stopVideo(0);}}      
                  />
              </div>
            </div>
        </div>
    );
};