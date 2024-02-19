import config from '~/configs';
import Home from '~/layouts/Home';
import Settings from '~/pages/Settings';
import NotFound from '~/layouts/NotFound';
import Create from '~/pages/softcard/Create';
import Partners from '~/pages/module/Partners';
import Product from '~/pages/softcard/Product';
import StatDaily from '~/pages/statistic/Daily';
import Destroy from '~/pages/module/Destroy';
import StatCharging from '~/pages/statistic/Charging';
import CreatePartners from '~/pages/module/Partners/Create';
import Login from '~/layouts/components/Login';

const { home, softcard, create, statistic, chargings, dailystat, tools, partners, settings, login } = config.routes;

const privateRoutes = [
    { path: home, component: Home },
    { path: login, component: Login, layout: null },
    { path: tools, component: Destroy },
    { path: softcard, component: Product },
    { path: settings, component: Settings },
    { path: partners, component: Partners },
    { path: softcard + create, component: Create },
    { path: '*', component: NotFound, layout: null },
    { path: softcard + '/edit/:id', component: Create },
    { path: partners + '/edit/:id', component: CreatePartners },
    { path: statistic + dailystat, component: StatDaily },
    { path: partners + create, component: CreatePartners },
    { path: statistic + chargings, component: StatCharging },
];

export { privateRoutes };
