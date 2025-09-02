import { useLocation, useNavigate, useParams } from 'react-router-dom';

const withRouter = Component => {
    const C = props => {
        const location = useLocation();
        const navigate = useNavigate();
        const params = useParams();

        return <Component {...props} history={{ push: navigate, location }} match={{ params }} />;
    };

    C.displayName = `withRouter(${Component.displayName || Component.name})`;
    C.WrappedComponent = Component;

    return C;
};

export default withRouter;
