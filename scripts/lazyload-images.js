'use strict';

function addLazyAttributes(content) {
  if (!content) return content;

  return content.replace(/<img\b([^>]*?)(\s*\/?)>/gi, function(match, attrs, closingSlash) {
    if (/\bloading\s*=/.test(attrs)) return match;

    var additions = ' loading="lazy"';
    if (!/\bdecoding\s*=/.test(attrs)) {
      additions += ' decoding="async"';
    }

    return '<img' + attrs + additions + closingSlash + '>';
  });
}

hexo.extend.filter.register('after_post_render', function(data) {
  data.content = addLazyAttributes(data.content);
  data.more = addLazyAttributes(data.more);
  data.excerpt = addLazyAttributes(data.excerpt);
  return data;
});
