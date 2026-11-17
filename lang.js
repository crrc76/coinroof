// 语言切换：?lang=en / #english 优先，其次上次的选择，最后跟随浏览器语言
(function () {
  var root = document.documentElement;
  function pick() {
    var q = new URLSearchParams(location.search).get('lang');
    if (q === 'zh' || q === 'en') return q;
    if (/^#(en|english)$/.test(location.hash)) return 'en';
    if (/^#zh$/.test(location.hash)) return 'zh';
    try { var s = localStorage.getItem('lang'); if (s === 'zh' || s === 'en') return s; } catch (e) {}
    return /^zh/i.test(navigator.language || '') ? 'zh' : 'en';
  }
  function apply(l) {
    root.setAttribute('data-lang', l);
    root.setAttribute('lang', l === 'zh' ? 'zh-CN' : 'en');
    var t = root.getAttribute('data-title-' + l);
    if (t) document.title = t;
  }
  apply(pick());
  document.addEventListener('DOMContentLoaded', function () {
    var t = root.getAttribute('data-title-' + root.getAttribute('data-lang'));
    if (t) document.title = t;
    document.querySelectorAll('.lang [data-set]').forEach(function (b) {
      b.addEventListener('click', function () {
        var l = b.getAttribute('data-set');
        apply(l);
        try { localStorage.setItem('lang', l); } catch (e) {}
        var u = new URL(location.href);
        u.searchParams.set('lang', l);
        u.hash = '';
        history.replaceState(null, '', u);
      });
    });
  });
})();
