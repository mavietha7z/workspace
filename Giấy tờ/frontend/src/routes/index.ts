import config from '~/configs';
import Home from '~/pages/Home';
import Modules from '~/pages/Modules';
import Software from '~/pages/Software';
import SourceDetail from '~/layouts/components/SourceDetail';
import Posts from '~/pages/Posts';
import DetailsService from '~/pages/DetailsService/DetailsService';

interface RouteProps {
    path: string;
    component: () => JSX.Element;
    layout?: null;
}

const { home, softwares, modules, source, posts, services } = config.routes;

const publicRoutes: RouteProps[] = [
    { path: home, component: Home },
    { path: services, component: DetailsService },
    { path: modules, component: Modules },
    { path: softwares, component: Software },
    { path: source, component: SourceDetail },
    { path: posts, component: Posts },
];

export default publicRoutes;
