function getBlogSegment(themeConfig) {
    const blogPath = (themeConfig.blog_path || '/blog').trim();
    return blogPath === '/' ? '' : blogPath.replace(/^\/+|\/+$/g, '');
}

hexo.extend.generator.register('folio_blog_index', function (locals) {
    const themeConfig = hexo.theme && hexo.theme.config ? hexo.theme.config : {};
    const blogSegment = getBlogSegment(themeConfig);
    const sourcePath = blogSegment ? blogSegment + '/index.md' : 'index.md';

    const source = locals.pages.find({ source: sourcePath });
    if (source && source.length) {
        return [];
    }

    return {
        path: blogSegment ? blogSegment + '/index.html' : 'index.html',
        data: {
            title: 'Blog'
        },
        layout: ['blog', 'page', 'index']
    };
});
