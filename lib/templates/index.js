import { createElement } from 'react';
import { createRoot } from 'react-dom';
import App from '../../src/App';
import routes from 'routes';

export default props => {
    const container = document.getElementById(props.moduleId);
    const root = createRoot(container);
    root.render(<App routes={routes} {...props} />);
};
