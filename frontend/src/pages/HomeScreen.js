import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingSpinner from '../components/LoadingSpinner';
import FormContainer from '../components/FormContainer';
import { Table, Alert, Form, Button } from 'react-bootstrap';
import { get_links_action } from '../actions/LinkActions';
import axios from 'axios';

function HomeScreen() {
        const dispatch = useDispatch();
        const {loading, links, error} = useSelector(state => state.links_list);
        const [url, set_url] = useState('');
        const [error_message ,set_error_message] = useState('');

        useEffect(() => {
                dispatch(get_links_action());        
        },[dispatch]);

        useEffect(() => {
                set_error_message(error);
        },[error]);

        const handle_submit = async e => {
                e.preventDefault();
                try {
                        const resp = await axios.post('http://localhost:5000/api/short-url/', {longUrl: url})
                        alert(await resp.data.message);
                        set_url('');
                        dispatch(get_links_action());
                } catch (err) {
                        alert(err.response.data.message);
                }    
               
        }

        return (
                <div>
                        
                     {loading ? <LoadingSpinner /> : error ? <Alert variant='danger'>{error_message}</Alert> : (
                             <>
                                <FormContainer>
                                      
                                        <Form onSubmit={handle_submit}>
                                                        <h2>Shorten URL</h2>
                                                        <Form.Group controlId='url'>
                                                                        <Form.Label>URL</Form.Label>
                                                                        <Form.Control required type='text' placeholder='Enter URL' value={url} onChange={e => set_url(e.target.value)}></Form.Control>
                                                        </Form.Group>

                                                        <Button disabled={!url || !(/((?:(?:http?|ftp)[s]*:\/\/)?[a-z0-9-%\/\&=?\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?)/gi).test(url)} type='submit' variant='primary'>Submit</Button>
                                                </Form>
                                       
                                       
                                </FormContainer>
                                <Table variant='dark' striped bordered hover style={{margin: '20px'}}>
                                     <thead>
                                             <tr>
                                                     <th>Original URL</th>
                                                     <th>Short Url</th>
                                                     <th>Usage Count</th>
                                             </tr>

                                            
                                     </thead>
                                     
                                     {links.length === 0 ? <Alert>Nothing to show</Alert> : (
                                        <tbody>
                                                 {links.map(link => (
                                                        <tr key={link._id}>
                                                                <td>{link.longUrl}</td>
                                                                <td>{link.shortenedUrl}</td>
                                                                <td>{link.clicks}</td>
                                                        </tr>
                                                 ))}
                                        </tbody>
                                     )}
                                    
                             </Table>
                           </> 
                             
                             
                              
                     )}  
                </div>
        )
}

export default HomeScreen;



