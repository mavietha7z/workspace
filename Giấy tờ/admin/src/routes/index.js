import config from '~/configs';
import Home from '~/layouts/Home';
import Settings from '~/pages/Settings';
import NotFound from '~/layouts/NotFound';
import Users from '~/pages/account/Users';
import SEOPage from '~/pages/tools/SEOPage';
import History from '~/pages/account/History';
import Category from '~/pages/Category';
import CreateSEO from '~/pages/tools/CreateSEO';
import DeleteData from '~/pages/tools/DeleteData';
import CreateCategory from '~/pages/Category/Create';
import CreateService from '~/pages/Service/Create';
import Service from '~/pages/Service';
import Login from '~/layouts/components/Login';

const { home, create, users, history, seo, tools, category, settings, services, login } = config.routes;

const privateRoutes = [
    { path: home, component: Home },
    { path: login, component: Login, layout: null },
    { path: seo, component: SEOPage },
    { path: users, component: Users },
    { path: tools, component: DeleteData },
    { path: settings, component: Settings },
    { path: category, component: Category },
    { path: services, component: Service },
    { path: category + '/edit/:id', component: CreateCategory },
    { path: services + '/edit/:id', component: CreateService },
    { path: seo + create, component: CreateSEO },
    { path: users + history, component: History },
    { path: '*', component: NotFound, layout: null },
    { path: category + create, component: CreateCategory },
    { path: services + create, component: CreateService },
];

export { privateRoutes };
