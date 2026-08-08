(function () {
  'use strict';

  // Shared helpers

  function thumbUrl(src) {
    if (/res\.cloudinary\.com/i.test(src)) {
      return src.replace('/image/upload/', '/image/upload/c_fill,w_600,h_400,q_auto:good,f_auto/');
    }
    return src.replace(/_[a-z]\.jpg$/i, '_m.jpg');
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

  function getLocationName(slug) {
    if (!slug) return 'Unassigned';
    if (typeof LOCATIONS_DATA === 'undefined') return slug;
    var location = LOCATIONS_DATA.find(function (item) {
      return item.slug === slug;
    });
    return location ? location.name : slug;
  }

  function getUsageLabel(photo) {
    if (photo.usage === 'about') return 'About page';
    return 'Gallery photo';
  }

  function getFlickrUrl(photo) {
    var metadata = typeof FLICKR_METADATA !== 'undefined' ? FLICKR_METADATA[photo.id] || {} : {};
    if (metadata.flickrId) {
      return 'https://www.flickr.com/photos/204244048@N05/' + metadata.flickrId + '/';
    }
    var match = String(photo.src || '').match(/\/65535\/(\d+)_/);
    return match ? 'https://www.flickr.com/photos/204244048@N05/' + match[1] + '/' : '';
  }

  function formatFlickrDate(value) {
    if (!value) return '';
    var date = new Date(String(value).replace(' ', 'T'));
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  }

  function getProjectOptions() {
    if (typeof GALLERY_IMAGES === 'undefined') return [''];
    return [...new Set(GALLERY_IMAGES.map(function (photo) {
      return photo.project || '';
    }))].sort();
  }

  function getLocationOptions() {
    if (typeof GALLERY_IMAGES === 'undefined') return [''];
    var dataLocations = typeof LOCATIONS_DATA !== 'undefined'
      ? LOCATIONS_DATA.map(function (location) { return location.slug; })
      : [];
    var photoLocations = GALLERY_IMAGES.map(function (photo) {
      return photo.location || '';
    });
    return [...new Set(dataLocations.concat(photoLocations))].sort();
  }

  // Metadata rendering

  function getPhotoMetadata(photo) {
    var flickr = typeof FLICKR_METADATA !== 'undefined' ? FLICKR_METADATA[photo.id] || {} : {};
    var camera = typeof FLICKR_CAMERA_METADATA !== 'undefined' ? FLICKR_CAMERA_METADATA[photo.id] || {} : {};
    return Object.assign({}, flickr, camera);
  }

  function buildMetadataRows(photo) {
    var metadata = getPhotoMetadata(photo);
    var dimensions = metadata.width && metadata.height ? metadata.width + ' x ' + metadata.height : '';
    var rows = [
      ['Camera', metadata.camera],
      ['Lens', metadata.lens],
      ['Shutter', metadata.shutter],
      ['Aperture', metadata.aperture],
      ['ISO', metadata.iso],
      ['Focal length', metadata.focalLength],
      ['Mode', metadata.exposureMode],
      ['Metering', metadata.meteringMode],
      ['White balance', metadata.whiteBalance],
      ['Flash', metadata.flash],
      ['Flickr title', metadata.title],
      ['Date taken', formatFlickrDate(metadata.dateTaken)],
      ['Dimensions', dimensions],
      ['Flickr ID', metadata.flickrId]
    ].filter(function (row) {
      return row[1];
    });

    if (!rows.length) {
      return '<p class="admin-photo-metadata-empty">No Flickr metadata saved for this photo.</p>';
    }

    return rows.map(function (row) {
      return '<div class="admin-photo-metadata-row">' +
        '<span>' + escapeHtml(row[0]) + '</span>' +
        '<strong>' + escapeHtml(row[1]) + '</strong>' +
      '</div>';
    }).join('');
  }

  // Card rendering and filters

  function buildProjectFilter() {
    var select = document.getElementById('filterProject');
    if (!select) return;

    getProjectOptions().forEach(function (project) {
      var option = document.createElement('option');
      option.value = project;
      option.textContent = project || '(No project)';
      select.appendChild(option);
    });
  }

  function buildLocationFilter() {
    var select = document.getElementById('filterLocation');
    if (!select) return;

    getLocationOptions().forEach(function (location) {
      var option = document.createElement('option');
      option.value = location;
      option.textContent = getLocationName(location);
      select.appendChild(option);
    });
  }

  function buildBadges(photo) {
    var badges = [];
    badges.push('<span class="admin-badge admin-badge--location">' + escapeHtml(getLocationName(photo.location)) + '</span>');
    if (photo.usage === 'about') {
      badges.push('<span class="admin-badge admin-badge--usage">About page</span>');
    }
    if (photo.is_featured) {
      badges.push('<span class="admin-badge admin-badge--featured">Featured</span>');
    }
    if (photo.project) {
      badges.push('<span class="admin-badge admin-badge--project">' + escapeHtml(photo.project) + '</span>');
    }
    return badges.join('');
  }

  function buildPhotoCard(photo, options) {
    var isSpecial = options && options.special;
    var article = document.createElement('article');
    article.className = isSpecial ? 'admin-card admin-card--special' : 'admin-card';
    article.dataset.id = photo.id;
    article.dataset.project = photo.project || '';
    article.dataset.location = photo.location || '';
    article.dataset.featured = photo.is_featured ? 'true' : 'false';
    article.dataset.usage = photo.usage || 'gallery';

    var fullUrl = cloudinaryImageUrl(photo, { original: true });
    var thumb = photo.cloudinaryPublicId ? cloudinaryImageUrl(photo, { width: 600 }) : thumbUrl(fullUrl);
    var flickrUrl = getFlickrUrl(photo);
    var metadataLabel = isSpecial ? 'about me photo' : 'photo #' + photo.id;
    var header = isSpecial
      ? '<div class="admin-card-id admin-card-id--special">' +
          '<div class="admin-id-main">' +
            '<span class="admin-id-label">About me</span>' +
            '<span class="admin-id-title">Page photo</span>' +
          '</div>' +
        '</div>'
      : '<div class="admin-card-id">' +
          '<div class="admin-id-main">' +
            '<span class="admin-id-label">Photo</span>' +
            '<span class="admin-id-number">#' + photo.id + '</span>' +
          '</div>' +
        '</div>';
    var details = isSpecial
      ? '<dl class="admin-details">' +
          '<div><dt>Use</dt><dd>' + escapeHtml(getUsageLabel(photo)) + '</dd></div>' +
          '<div><dt>Page</dt><dd>About me</dd></div>' +
          '<div><dt>Featured</dt><dd>No</dd></div>' +
        '</dl>'
      : '<dl class="admin-details">' +
          '<div><dt>ID</dt><dd>#' + photo.id + '</dd></div>' +
          '<div><dt>Location</dt><dd>' + escapeHtml(getLocationName(photo.location)) + '</dd></div>' +
          '<div><dt>Project</dt><dd>' + escapeHtml(photo.project || 'None') + '</dd></div>' +
          '<div><dt>Featured</dt><dd>' + (photo.is_featured ? 'Yes' : 'No') + '</dd></div>' +
          '<div><dt>Use</dt><dd>' + escapeHtml(getUsageLabel(photo)) + '</dd></div>' +
        '</dl>';
    var promptActions = isSpecial
      ? ''
      : '<div class="admin-copy-actions">' +
          '<button class="admin-copy-btn admin-add-prompt-btn" type="button" data-photo-id="' + photo.id + '">Add to active group</button>' +
        '</div>';
    var copyNumberButton = isSpecial
      ? ''
      : '<button class="admin-copy-btn" type="button" data-copy-text="' + escapeAttr(String(photo.id)) + '">Copy #</button>';

    article.innerHTML =
      header +
      '<div class="admin-card-thumb">' +
        '<img src="' + thumb + '" alt="' + escapeAttr(photo.alt) + '" loading="lazy" data-full="' + escapeAttr(fullUrl) + '" data-loading="true">' +
        '<button class="admin-metadata-toggle" type="button" aria-expanded="false" aria-label="Show metadata for ' + metadataLabel + '" data-photo-id="' + photo.id + '">i</button>' +
      '</div>' +
      '<div class="admin-card-meta">' +
        '<div class="admin-photo-metadata" id="adminMetadata' + photo.id + '" hidden>' + buildMetadataRows(photo) + '</div>' +
        '<p class="admin-meta-alt">' + escapeHtml(photo.alt) + '</p>' +
        '<div class="admin-badges">' + buildBadges(photo) + '</div>' +
        (photo.species ? '<p class="admin-meta-species">' + escapeHtml(photo.species) + '</p>' : '') +
        details +
        promptActions +
        '<div class="admin-meta-url">' +
          '<code class="admin-url-text">' + escapeHtml(fullUrl) + '</code>' +
          '<div class="admin-url-actions">' +
            copyNumberButton +
            (flickrUrl ? '<button class="admin-copy-btn" type="button" data-copy-text="' + escapeAttr(flickrUrl) + '">Copy Flickr</button>' : '') +
            '<button class="admin-copy-btn" type="button" data-copy-text="' + escapeAttr(fullUrl) + '">Copy image URL</button>' +
          '</div>' +
        '</div>' +
      '</div>';

    var img = article.querySelector('.admin-card-thumb img');
    img.addEventListener('load', function () {
      this.removeAttribute('data-loading');
    });
    img.addEventListener('error', function () {
      this.src = fullUrl;
      this.removeAttribute('data-loading');
      this.onerror = null;
    });

    return article;
  }

  function renderCards() {
    var grid = document.getElementById('adminGrid');
    var aboutGrid = document.getElementById('adminAboutGrid');
    var aboutSection = document.getElementById('aboutPhotoSection');
    if (!grid && !aboutGrid) return;
    if (grid) grid.innerHTML = '';
    if (aboutGrid) aboutGrid.innerHTML = '';

    if (typeof GALLERY_IMAGES === 'undefined' || !GALLERY_IMAGES.length) {
      var emptyTarget = grid || aboutGrid;
      emptyTarget.innerHTML =
        '<p class="admin-empty">Photo data not loaded - check that ' +
        '<code>photo-data.js</code> is present and contains a valid ' +
        '<code>GALLERY_IMAGES</code> array.</p>';
      updateCount();
      return;
    }

    GALLERY_IMAGES.forEach(function (photo) {
      if (photo.usage === 'about' && aboutGrid) {
        aboutGrid.appendChild(buildPhotoCard(photo, { special: true }));
        return;
      }
      if (photo.usage === 'about' || !grid) return;
      grid.appendChild(buildPhotoCard(photo));
    });

    if (aboutSection && aboutGrid) {
      aboutSection.hidden = !aboutGrid.children.length;
    }
    updateCount();
  }

  function applyFilters() {
    var projectFilter = document.getElementById('filterProject').value;
    var locationFilter = document.getElementById('filterLocation').value;
    var featuredFilter = document.getElementById('filterFeatured').value;

    document.querySelectorAll('#adminGrid .admin-card').forEach(function (card) {
      var matchProject = projectFilter === 'all' || card.dataset.project === projectFilter;
      var matchLocation = locationFilter === 'all' || card.dataset.location === locationFilter;
      var matchFeatured = featuredFilter === 'all' || card.dataset.featured === featuredFilter;
      card.hidden = !(matchProject && matchLocation && matchFeatured);
    });
    updateCount();
  }

  function updateCount() {
    var aboutOnlyGrid = !document.getElementById('adminGrid') && document.getElementById('adminAboutGrid');
    if (aboutOnlyGrid) {
      var aboutTotal = document.querySelectorAll('#adminAboutGrid .admin-card').length;
      var aboutEl = document.getElementById('adminCount');
      if (aboutEl) aboutEl.textContent = aboutTotal ? 'Showing About me photo' : 'No About me photo found';
      return;
    }

    var total = document.querySelectorAll('#adminGrid .admin-card').length;
    var visible = document.querySelectorAll('#adminGrid .admin-card:not([hidden])').length;
    var el = document.getElementById('adminCount');
    if (el) el.textContent = 'Showing ' + visible + ' of ' + total + ' photos';
  }

  // Prompt builder

  var promptGroups = [];
  var activePromptGroupId = 1;
  var nextPromptGroupId = 1;

  function createPromptGroup() {
    var group = {
      id: nextPromptGroupId,
      location: '',
      featured: '',
      project: '',
      photoIds: new Set()
    };
    nextPromptGroupId += 1;
    promptGroups.push(group);
    activePromptGroupId = group.id;
    updatePromptPanel();
  }

  function activePromptGroup() {
    return promptGroups.find(function (group) {
      return group.id === activePromptGroupId;
    }) || promptGroups[0];
  }

  function selectedIdsText(photoIds) {
    return Array.from(photoIds)
      .sort(function (a, b) { return Number(a) - Number(b); })
      .map(function (id) { return '#' + id; })
      .join(', ');
  }

  function buildGroupPrompt() {
    var lines = promptGroups
      .filter(function (group) {
        return group.photoIds.size && (group.location || group.featured || group.project);
      })
      .map(function (group) {
        var actions = [];
        if (group.location) {
          actions.push('set location to ' + getLocationName(group.location));
        }
        if (group.featured) {
          actions.push('set featured to ' + group.featured);
        }
        if (group.project) {
          actions.push('set project to ' + (group.project === '__none__' ? 'none' : group.project));
        }
        return 'Update photos ' + selectedIdsText(group.photoIds) + ': ' + actions.join('; ') + '.';
      });

    return lines.join('\n');
  }

  function buildLocationOptions(selectedValue) {
    return getLocationOptions()
      .filter(function (location) { return location; })
      .map(function (location) {
        return '<option value="' + escapeAttr(location) + '"' + (location === selectedValue ? ' selected' : '') + '>' +
          escapeHtml(getLocationName(location)) +
        '</option>';
      })
      .join('');
  }

  function buildFeaturedOptions(selectedValue) {
    var options = [
      { value: '', label: 'Leave featured unchanged' },
      { value: 'true', label: 'Featured: true' },
      { value: 'false', label: 'Featured: false' }
    ];
    return options.map(function (option) {
      return '<option value="' + escapeAttr(option.value) + '"' + (option.value === selectedValue ? ' selected' : '') + '>' +
        escapeHtml(option.label) +
      '</option>';
    }).join('');
  }

  function buildProjectOptions(selectedValue) {
    var options = [
      { value: '', label: 'Leave project unchanged' },
      { value: '__none__', label: 'No project' }
    ].concat(getProjectOptions()
      .filter(function (project) { return project; })
      .map(function (project) {
        return { value: project, label: project };
      }));

    return options.map(function (option) {
      return '<option value="' + escapeAttr(option.value) + '"' + (option.value === selectedValue ? ' selected' : '') + '>' +
        escapeHtml(option.label) +
      '</option>';
    }).join('');
  }

  function renderPromptGroups() {
    var container = document.getElementById('promptGroups');
    if (!container) return;

    container.innerHTML = promptGroups.map(function (group, index) {
      var isActive = group.id === activePromptGroupId;
      return '<section class="admin-prompt-group" data-group-id="' + group.id + '" data-active="' + (isActive ? 'true' : 'false') + '">' +
        '<div class="admin-prompt-group-header">' +
          '<label class="admin-prompt-active">' +
            '<input type="radio" name="activePromptGroup" value="' + group.id + '"' + (isActive ? ' checked' : '') + '>' +
            '<span>Group ' + (index + 1) + '</span>' +
          '</label>' +
          '<span class="admin-prompt-group-count">' + group.photoIds.size + ' selected</span>' +
          (promptGroups.length > 1 ? '<button class="admin-prompt-remove" type="button" data-remove-group="' + group.id + '">Remove</button>' : '') +
        '</div>' +
        '<div class="admin-prompt-fields">' +
          '<label class="admin-prompt-field">' +
            '<span>Location</span>' +
            '<select class="admin-select admin-prompt-select" data-group-field="location" data-group-id="' + group.id + '">' +
              '<option value="">Leave location unchanged</option>' +
              buildLocationOptions(group.location) +
            '</select>' +
          '</label>' +
          '<label class="admin-prompt-field">' +
            '<span>Featured</span>' +
            '<select class="admin-select admin-prompt-select" data-group-field="featured" data-group-id="' + group.id + '">' +
              buildFeaturedOptions(group.featured) +
            '</select>' +
          '</label>' +
          '<label class="admin-prompt-field">' +
            '<span>Project</span>' +
            '<select class="admin-select admin-prompt-select" data-group-field="project" data-group-id="' + group.id + '">' +
              buildProjectOptions(group.project) +
            '</select>' +
          '</label>' +
        '</div>' +
        '<p class="admin-prompt-selected">' + (group.photoIds.size ? selectedIdsText(group.photoIds) : 'No photos selected') + '</p>' +
      '</section>';
    }).join('');
  }

  function updatePromptCards() {
    document.querySelectorAll('.admin-card').forEach(function (card) {
      var selectedGroups = promptGroups.filter(function (group) {
        return group.photoIds.has(card.dataset.id);
      });
      card.dataset.selected = selectedGroups.length ? 'true' : 'false';
      card.dataset.activeSelected = activePromptGroup()?.photoIds.has(card.dataset.id) ? 'true' : 'false';

      var button = card.querySelector('.admin-add-prompt-btn');
      if (button) {
        button.textContent = card.dataset.activeSelected === 'true'
          ? 'Remove from active group'
          : 'Add to active group';
      }
    });
  }

  function updatePromptPanel() {
    var totalSelected = promptGroups.reduce(function (sum, group) {
      return sum + group.photoIds.size;
    }, 0);
    var count = document.getElementById('promptCount');
    var text = document.getElementById('promptText');

    renderPromptGroups();
    updatePromptCards();

    if (count) count.textContent = totalSelected + ' selected';
    if (text) text.value = buildGroupPrompt();
  }

  function togglePromptPhoto(photoId) {
    var group = activePromptGroup();
    if (!group) return;

    if (group.photoIds.has(photoId)) {
      group.photoIds.delete(photoId);
    } else {
      group.photoIds.add(photoId);
    }
    updatePromptPanel();
  }

  function removePromptGroup(groupId) {
    promptGroups = promptGroups.filter(function (group) {
      return group.id !== groupId;
    });
    if (!promptGroups.length) createPromptGroup();
    if (!promptGroups.some(function (group) { return group.id === activePromptGroupId; })) {
      activePromptGroupId = promptGroups[0].id;
    }
    updatePromptPanel();
  }

  function clearPromptGroups() {
    promptGroups = [];
    nextPromptGroupId = 1;
    createPromptGroup();
  }

  function togglePromptPanel() {
    var panel = document.querySelector('.admin-prompt-panel');
    var button = document.getElementById('togglePromptPanel');
    if (!panel || !button) return;

    var willMinimize = panel.dataset.minimized !== 'true';
    panel.dataset.minimized = willMinimize ? 'true' : 'false';
    button.textContent = willMinimize ? 'Expand' : 'Minimize';
    button.setAttribute('aria-expanded', String(!willMinimize));
  }

  // Interactions

  function flashCopied(btn) {
    var originalText = btn.textContent;
    btn.textContent = 'Copied!';
    setTimeout(function () { btn.textContent = originalText; }, 1500);
  }

  function copyTextFallback(text) {
    var textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }

  function copyText(text, btn) {
    if (!text) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        if (btn) flashCopied(btn);
      }).catch(function () {
        copyTextFallback(text);
        if (btn) flashCopied(btn);
      });
      return;
    }

    copyTextFallback(text);
    if (btn) flashCopied(btn);
  }

  document.addEventListener('click', function (event) {
    var metadataBtn = event.target.closest('.admin-metadata-toggle');
    if (metadataBtn) {
      var card = metadataBtn.closest('.admin-card');
      var panel = card ? card.querySelector('.admin-photo-metadata') : null;
      if (!panel) return;
      var willOpen = panel.hidden;
      panel.hidden = !willOpen;
      metadataBtn.setAttribute('aria-expanded', String(willOpen));
      metadataBtn.setAttribute('aria-label', (willOpen ? 'Hide' : 'Show') + ' metadata for photo #' + metadataBtn.dataset.photoId);
      return;
    }

    var addPromptBtn = event.target.closest('.admin-add-prompt-btn');
    if (addPromptBtn) {
      togglePromptPhoto(addPromptBtn.dataset.photoId);
      return;
    }

    var removeGroupBtn = event.target.closest('[data-remove-group]');
    if (removeGroupBtn) {
      removePromptGroup(Number(removeGroupBtn.dataset.removeGroup));
      return;
    }

    var copyBtn = event.target.closest('.admin-copy-btn');
    if (!copyBtn) return;

    if (copyBtn.id === 'copyPromptGroup') {
      var promptText = document.getElementById('promptText');
      copyText(promptText ? promptText.value : '', copyBtn);
      return;
    }

    copyText(copyBtn.dataset.copyText || '', copyBtn);
  });

  document.addEventListener('change', function (event) {
    if (event.target.name === 'activePromptGroup') {
      activePromptGroupId = Number(event.target.value);
      updatePromptPanel();
      return;
    }

    if (event.target.matches('[data-group-field]')) {
      var groupId = Number(event.target.dataset.groupId);
      var field = event.target.dataset.groupField;
      var group = promptGroups.find(function (item) {
        return item.id === groupId;
      });
      if (group && Object.prototype.hasOwnProperty.call(group, field)) {
        group[field] = event.target.value;
      }
      updatePromptPanel();
    }
  });

  // Initialization

  var filterProject = document.getElementById('filterProject');
  var filterLocation = document.getElementById('filterLocation');
  var filterFeatured = document.getElementById('filterFeatured');
  var addPromptGroup = document.getElementById('addPromptGroup');
  var clearPromptGroupsBtn = document.getElementById('clearPromptGroups');
  var togglePromptPanelBtn = document.getElementById('togglePromptPanel');

  if (filterProject) filterProject.addEventListener('change', applyFilters);
  if (filterLocation) filterLocation.addEventListener('change', applyFilters);
  if (filterFeatured) filterFeatured.addEventListener('change', applyFilters);
  if (addPromptGroup) addPromptGroup.addEventListener('click', createPromptGroup);
  if (clearPromptGroupsBtn) clearPromptGroupsBtn.addEventListener('click', clearPromptGroups);
  if (togglePromptPanelBtn) togglePromptPanelBtn.addEventListener('click', togglePromptPanel);

  buildProjectFilter();
  buildLocationFilter();
  renderCards();
  createPromptGroup();
}());
