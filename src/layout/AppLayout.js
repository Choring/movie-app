import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet, useNavigate } from 'react-router-dom';
import { Footer } from './Footer/Footer';
import { UpArrow } from '../components/UpArrow';

export const AppLayout = () => {
    const [keyword, setKeyword] = useState("");
    const navigate= useNavigate();

    const searchByKeword = (event) => {
        event.preventDefault();
        //url을 바꿔주기
        navigate(`/movies?q=${keyword}`);
        setKeyword("");
    }
  return (
    <div>
        <Navbar expand="lg" className="py-0 nav-container position-fixed w-100" style={{zIndex:"999"}}>
            <Container>
                <Navbar.Brand href="/">
                    <img src='./cgvLogo.png' alt='logo' width={80} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                >
                    <Nav.Link href="/" className='text-white noto-medium'>홈</Nav.Link>
                    <Nav.Link href="/movies" className='text-white noto-medium'>영화</Nav.Link>
                </Nav>
                <Form className="d-flex" onSubmit={(event) => {searchByKeword(event)}}>
                    <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2 search"
                    aria-label="Search"
                    value={keyword}
                    onChange={(event) => setKeyword(event.target.value)}
                    />
                    <Button variant="outline-danger noto-medium">Search</Button>
                </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <Outlet />
        <Footer />
        <UpArrow />
        
    </div>
  )
}
