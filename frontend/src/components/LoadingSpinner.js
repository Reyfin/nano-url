import loading from '../assets/loading.gif';

const LoadingSpinner = () => {
        return (
                <img src={loading} alt="Loading Spinner" style={style} />
        );
}


const style = {
         width: '100px', height: '100px', position: 'absolute', top: '50%', left: '50%', marginLeft:'-50px', marginTop: '-50px'
}

export default LoadingSpinner;


