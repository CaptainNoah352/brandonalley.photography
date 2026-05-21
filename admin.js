(function () {
  'use strict';

  function thumbUrl(src) {
    return src.replace(/_[a-z]\.jpg$/i, '_m.jpg');
  }

  function buildProjectFilter() {
    const select = document.getElementById('filterProject');
    if (!select || !window.GALLERY_IMAGES) return;

    const projects = [...new Set(GALLERY_IMAGES.map(function (p) { return p.project || ''; }))].sort();
    projects.forEach(function (proj) {
      const opt = document.createElement('option');
      opt.value = proj;
      opt.textContent = proj || '(No project)';
      select.appendChild(opt);
    });
  }

  function buildBadges(photo) {
    var html = '';
    if (photo.is_featured) {
      html += '<span class="admin-badge admin-badge--featured">Featured</span>';
    }
    if (photo.project) {
      html += '<span class="admin-badge admin-badge--project">' + photo.project + '</span>';
    }
    return html;
  }

  function renderCards() {
    var grid = document.getElementById('adminGrid');
    if (!grid || !window.GALLERY_IMAGES) return;

    GALLERY_IMAGES.forEach(function (photo) {
      var article = document.createElement('article');
      article.className = 'admin-card';
      article.dataset.id = photo.id;
      article.dataset.project = photo.project || '';
      article.dataset.featured = photo.is_featured ? 'true' : 'false';

      var thumb = thumbUrl(photo.src);

      article.innerHTML =
        '<div class="admin-card-id">' +
          '<span class="admin-id-label">Photo</span>' +
          '<span class="admin-id-number">#' + photo.id + '</span>' +
        '</div>' +
        '<div class="admin-card-thumb">' +
          '<img src="' + thumb + '" alt="' + escapeAttr(photo.alt) + '" loading="lazy" data-full="' + escapeAttr(photo.src) + '" data-loading="true">' +
        '</div>' +
        '<div class="admin-card-meta">' +
          '<p class="admin-meta-alt">' + escapeHtml(photo.alt) + '</p>' +
          '<div class="admin-badges">' + buildBadges(photo) + '</div>' +
          (photo.species ? '<p class="admin-meta-species">' + escapeHtml(photo.species) + '</p>' : '') +
          '<div class="admin-meta-url">' +
            '<code class="admin-url-text">' + escapeHtml(photo.src) + '</code>' +
            '<button class="admin-copy-btn" type="button" data-url="' + escapeAttr(photo.src) + '">Copy URL</button>' +
          '</div>' +
        '</div>';

      var img = article.querySelector('.admin-card-thumb img');
      img.addEventListener('load', function () {
        this.removeAttribute('data-loading');
      });
      img.addEventListener('error', function () {
        this.src = photo.src;
        this.removeAttribute('data-loading');
        this.onerror = null;
      });

      grid.appendChild(article);
    });

    updateCount();
  }

  function applyFilters() {
    var projectFilter = document.getElementById('filterProject').value;
    var featuredFilter = document.getElementById('filterFeatured').value;

    document.querySelectorAll('.admin-card').forEach(function (card) {
      var matchProject = projectFilter === 'all' || card.dataset.project === projectFilter;
      var matchFeatured = featuredFilter === 'all' || card.dataset.featured === featuredFilter;
      card.hidden = !(matchProject && matchFeatured);
    });
    updateCount();
  }

  function updateCount() {
    var total = document.querySelectorAll('.admin-card').length;
    var visible = document.querySelectorAll('.admin-card:not([hidden])').length;
    var el = document.getElementById('adminCount');
    if (el) el.textContent = 'Showing ' + visible + ' of ' + total + ' photos';
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function escapeAttr(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;');
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.admin-copy-btn');
    if (!btn) return;
    var url = btn.dataset.url;
    if (!url) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(function () {
        var orig = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(function () { btn.textContent = orig; }, 1500);
      });
    } else {
      var ta = document.createElement('textarea');
      ta.value = url;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      var orig = btn.textContent;
      btn.textContent = 'Copied!';
      setTimeout(function () { btn.textContent = orig; }, 1500);
    }
  });

  var filterProject = document.getElementById('filterProject');
  var filterFeatured = document.getElementById('filterFeatured');
  if (filterProject) filterProject.addEventListener('change', applyFilters);
  if (filterFeatured) filterFeatured.addEventListener('change', applyFilters);

  buildProjectFilter();
  renderCards();
}());
