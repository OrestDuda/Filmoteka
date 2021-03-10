const pagination = require('pagination');
const params = new URLSearchParams(window.location.search);
const pageNumber = params.get('page') || 1;

const boostrapPaginator = new pagination.TemplatePaginator({
  prelink: '/',
  current: pageNumber,
  rowsPerPage: 20,
  totalResult: 10020,
  slashSeparator: false,
  template: function (result) {
    let i, len, prelink;
    let html = '<div><ul class="pagination">';
    if (result.pageCount < 2) {
      html += '</ul></div>';
      return html;
    }
    prelink = this.preparePreLink(result.prelink);
    if (result.previous) {
      html +=
        '<li class="page-item"><a class="page-link" href="' +
        prelink +
        result.previous +
        '">' +
        this.options.translator('PREVIOUS') +
        '</a></li>';
    }
    if (result.range.length) {
      for (i = 0, len = result.range.length; i < len; i++) {
        if (result.range[i] === result.current) {
          html +=
            '<li class="active page-item"><a class="page-link" href="' +
            prelink +
            result.range[i] +
            '">' +
            result.range[i] +
            '</a></li>';
        } else {
          html +=
            '<li class="page-item"><a class="page-link" href="' +
            prelink +
            result.range[i] +
            '">' +
            result.range[i] +
            '</a></li>';
        }
      }
    }
    if (result.next) {
      html +=
        '<li class="page-item"><a class="page-link" href="' +
        prelink +
        result.next +
        '" class="paginator-next">' +
        this.options.translator('NEXT') +
        '</a></li>';
    }
    html += '</ul></div>';
    return html;
  },
});
export default boostrapPaginator;
document
  .querySelector('.pagination')
  .insertAdjacentHTML('beforeend', boostrapPaginator.render());
