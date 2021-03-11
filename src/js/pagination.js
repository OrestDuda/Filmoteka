import Pagination from 'tui-pagination';

function initializePagination() {
  const container = document.querySelector('.pagination');

  const pagination = new Pagination(container, {
    totalItems: 60,
    itemsPerPage: 20,
    visiblePages: 5,
    centerAlign: true,
  });

  pagination.on('beforeMove', function (eventData) {
    const params = new URLSearchParams(window.location.search);
    params.set('page', eventData.page);
    history.pushState(null, null, '?' + params.toString());
  });

  pagination.on('afterMove', function (eventData) {
    if (pagination._options.totalItems <= 20) {
      container.innerHTML = '';
    }
  });

  return pagination;
}

export { initializePagination as default };


