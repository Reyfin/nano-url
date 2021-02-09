import './bootstrap.min.css';
import Header from './components/Header';
import HomeScreen from './pages/HomeScreen';
import { BrowserRouter, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
const App = () => {
	
	return (
		<BrowserRouter>
			<Header />
			<main className="py-3">
				<Container>
					<Route path='/' exact component={HomeScreen} />
				</Container>
			</main>
		</BrowserRouter>
		
	);
}

export default App;
