import { Navbar,Nav,Container} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';


const Header = () => {
        return (
                <header>
			<Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
				<Container>
					<LinkContainer to="/">
						<Navbar.Brand href="#home">Nano URL</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<LinkContainer to="/">
							<Nav.Link><i className="fas fa-home fa-margin-right"></i>Home</Nav.Link>
						</LinkContainer>	
					</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
        );
}

export default Header;