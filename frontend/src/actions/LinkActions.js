import {
        LINKS_LIST_FAIL,
        LINKS_LIST_SUCCESS,
        LINKS_LIST_REQUEST
} from '../constants/LinkConstants';
import axios from 'axios';

export const get_links_action = () => async (dispatch) => {
        dispatch({
                type: LINKS_LIST_REQUEST
        });

        try {
                const data = await axios.get('http://localhost:5000/api/');
                const links = await data.data.urlList;
                dispatch({
                        type: LINKS_LIST_SUCCESS,
                        payload: links
                });

        } catch(error) {
                dispatch({
                        type: LINKS_LIST_FAIL,
                        payload: error.message
                });
        }

        

}