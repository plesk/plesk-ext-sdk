import { render, createElement } from '@plesk/ui-library';
import App from '../../src/App';
import routes from 'routes';

export default props => {
    render(
        <App routes={routes} {...props} />,
        document.getElementById(props.moduleId)
    );
};
