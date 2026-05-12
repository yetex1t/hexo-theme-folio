function getBlogSegment(themeConfig) {
    const blogPath = (themeConfig.blog_path || '/blog').trim();
    return blogPath === '/' ? '' : blogPath.replace(/^\/+|\/+$/g, '');
}

hexo.on('generateBefore', function () {
    const themeConfig = hexo.theme && hexo.theme.config;
    hexo.config.archive_generator = {
        yearly: false,
        monthly: false,
        daily: false
    };

    if (!themeConfig || !themeConfig.post_permalink) {
        return;
    }

    const blogSegment = getBlogSegment(themeConfig);
    const permalinkTemplate = String(themeConfig.post_permalink).replace(/^\/+/, '');
    hexo.config.permalink = blogSegment ? blogSegment + '/' + permalinkTemplate : permalinkTemplate;
});
