const Router = {
  Form: ['button', 'select'],
  Table:['table']
};

function getRouterConfig(langPrefix = '/') {
  return [
    {
      text: langPrefix === '/' ? 'Getting started' : '介绍',
      link: `${langPrefix}`,
    },
    ...Object.entries(Router).map(([text, children]) => ({
      text,
      children: children.map(hookName => ({
        link: `${langPrefix}${hookName}/`,
        text: hookName,
      })),
    }))
  ];
}

module.exports = {
  getRouterConfig,
};