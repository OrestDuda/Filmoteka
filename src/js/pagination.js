import Pagination from 'tui-pagination';

function initializePagination(paginationCallback) {
  const container = document.querySelector('.pagination');

  const pagination = new Pagination(container, {
    totalItems: 500,
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
    const params = new URLSearchParams(window.location.search);
    const currentPage = params.get('page') || 1;

    paginationCallback(currentPage).then(totalItems => {
      pagination.setTotalItems(totalItems);
      if (totalItems === 0) {
        container.innerHTML = '';
      }
    });
  });

  return pagination;
}

export { initializePagination as default };
