import React from 'react';
import './ModalContent.style.css';
import YouTube from 'react-youtube';

export const ModalContent = ({ onClose, videoKey }) => {
    console.log(videoKey);
    return (
        <>
            <div className="modal-overlay" onClick={onClose}></div>
            <div className="movie-modal">
              <div>
                  <div className='d-flex justify-content-end'>
                    <button onClick={onClose}>X</button>
                  </div>
                  <YouTube
                    videoId={videoKey}
                    opts={{
                      width: "560",
                      height: "315",
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
        </>
    );
};