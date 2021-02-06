import './styles/app.scss';
import {useState} from 'react';
const App = () => {
	const [link, set_link] = useState("");
	const handle_link_submit = async () => {
		const resp = await fetch(
			"http://localhost:5000/api/short-url",
			{
				method: "POST",
				headers:{
					"Content-Type":"application/json"
				},
				body: JSON.stringify({
					longUrl:link,
					shortCode: "a1b1c1"
				})
			}
		);

		console.log(await resp.json());
	}

	const handle_link_change = e => {
		set_link(e.target.value);
	}
	return (
		<div id="App">
			<input type="text" value={link} onChange={handle_link_change} />
			<button onClick={handle_link_submit}>Submit</button>
			{link && `You have entered ${link}`}
		</div>
	);
}

export default App;
