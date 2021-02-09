export const links_list_reducer = (state = { links: [] }, actions) => {
        switch(actions.type) {
                case 'LINKS_LIST_REQUEST':
                        return {
                                ...state,
                                loading:true
                        }

                case 'LINKS_LIST_SUCCESS':
                        return {
                                loading:false,
                                links: actions.payload
                        }

                case 'LINKS_LIST_FAIL':
                        return {
                                loading: false,
                                error: actions.payload
                        }

                default:
                        return state
        }
}