function normalizeBlogPath(input) {
    const raw = (input || '/blog').trim();
    if (raw === '/' || raw === '') return '';
    return raw.replace(/^\/+|\/+$/g, '');
}

function hasSourcePage(locals, sourcePath) {
    const page = locals.pages.find({ source: sourcePath });
    return !!(page && page.length);
}

hexo.extend.filter.register('before_generate', function () {
    const themeConfig = hexo.theme && hexo.theme.config ? hexo.theme.config : {};
    const blogSegment = normalizeBlogPath(themeConfig.blog_path);

    if (!hexo.config.index_generator) {
        hexo.config.index_generator = {};
    }

    hexo.config.index_generator.path = blogSegment || '';
});

hexo.extend.generator.register('folio_root_placeholder', function (locals) {
    const themeConfig = hexo.theme && hexo.theme.config ? hexo.theme.config : {};
    const blogSegment = normalizeBlogPath(themeConfig.blog_path);

    if (blogSegment === '') return [];
    if (hasSourcePage(locals, 'index.md')) return [];

    return {
        path: 'index.html',
        data: {
            title: ''
        },
        layout: ['index', 'page']
    };
});
