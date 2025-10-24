// Copyright 1999-2025. WebPros International GmbH. All rights reserved.
import { createElement } from 'react';
import {
    useLocation,
    useNavigate,
    useParams,
} from 'react-router-dom';

/**
 * @deprecated use react-dom hooks instead
 */
export const withRouter = Component => {
    const ComponentWithRouterProp = props => {
        const location = useLocation();
        const navigate = useNavigate();
        const params = useParams();

        return (
            <Component
                {...props}
                location={location}
                navigate={navigate}
                params={params}
            />
        );
    };

    return ComponentWithRouterProp;
};
