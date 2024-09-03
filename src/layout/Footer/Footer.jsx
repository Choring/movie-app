import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <div className="border border-start-0 border-start-0 border-dark-subtle pt-4" style={{background:"black"}}>
        <Container>
            <Row className='text-secondary'>
                <Col md={6}>
                    <div className='d-flex gap-3' style={{fontSize:"1rem", cursor:"pointer"}}>
                        <div className='noto-semi-bold'>회사소개</div>
                        <div className='noto-semi-bold'>서비스 소개</div>
                        <div className='noto-semi-bold'>이용약관</div>
                        <div className='noto-semi-bold'>개인정보 처리방침</div>
                        <div className='noto-semi-bold'>고객센터</div>
                        <div className='noto-semi-bold'>이벤트</div>
                    </div>
                    <div className='d-flex gap-3 my-3' style={{fontSize:"0.8rem", cursor:"default"}}>
                        <p className='noto-semi-bold'>개발자:초링이</p>
                        <p className='noto-semi-bold'>개발직무:프론트엔드</p>
                        <p className='noto-semi-bold'>이메일:skyhonor201@gmail.com</p>
                    </div>
                </Col>
                <Col md={6}>
                    <div className='d-flex gap-3 justify-content-center'>
                        <Link to={'https://www.instagram.com/choring_92/'} target="_blank">
                            <img src="/icon/logo-instagram.svg" alt="insta" width={50} />
                        </Link>
                        <Link to={'https://github.com/Choring'} target="_blank">
                            <img src="/icon/logo-github.svg" alt="github" width={50} />
                        </Link>
                    </div>
                </Col>
            </Row>
        </Container>
    </div>
  )
}
