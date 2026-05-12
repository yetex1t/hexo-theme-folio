hexo.extend.generator.register('folio_404', function () {
    return {
        path: '404.html',
        data: {
            title: '404'
        },
        layout: ['404', 'page', 'index']
    };
});
