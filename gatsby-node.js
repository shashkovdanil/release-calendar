exports.onCreatePage = async ({ page, actions }) => {
  const { createPage, createRedirect } = actions
  const releaseTypes = ['films', 'games']

  createRedirect({
    fromPath: '/',
    toPath: '/films',
    redirectInBrowser: true,
    isPermanent: true,
  })

  releaseTypes.forEach(type => {
    if (page.path.includes(type)) {
      page.matchPath = `/${type}/*`

      createPage(page)
    }
  })
}
