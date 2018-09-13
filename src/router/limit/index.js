import router from '../router';
import limitIhmp from './limit_ihmp';

// 不同模块对应不同的路由策略, 默认没有策略
const getLimit = (path) => {
  if (path.startsWith('/crm/v_ihmp/')) return limitIhmp;
};

router.beforeEach((to, from, next) => {
  const { beforeEach } = getLimit(to.path) || {};
  if (typeof beforeEach === 'function') beforeEach(to, from, next);
  else next();
});

router.afterEach((to, from) => {
  const { afterEach } = getLimit(to.path) || {};
  if (typeof afterEach === 'function') afterEach(to, from);
});
