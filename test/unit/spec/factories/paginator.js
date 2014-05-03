'use strict';

describe('Service: Paginator', function () {

  var Paginator;

  beforeEach(function () {

    module('ndc');

    inject(function (_Paginator_) {
      Paginator = _Paginator_;
    });

  });

  it('should return total number of pages', function () {
    var data = [1, 2, 3, 4, 5, 6, 7, 8, 9],
      paginated = new Paginator({
        data: data,
        pageSize: 5
      });

    expect(paginated.getNumberOfPages()).toBe(2);
  });

  it('should return current page number', function () {
    var data = [1, 2, 3, 4, 5, 6, 7, 8, 9],
      paginated = new Paginator({
        data: data,
        pageSize: 5
      });

    expect(paginated.getCurrentPageNumber()).toBe(1);
    paginated.setPage(2);
    expect(paginated.getCurrentPageNumber()).toBe(2);
  });

  it('should paginate data', function () {
    var data = [1, 2, 3, 4, 5, 6, 7, 8, 9],
      paginated = new Paginator({
        data: data,
        pageSize: 5
      });

    paginated.setPage(2);
    expect(paginated.getPaginatedData()).toEqual([6, 7, 8, 9]);
  });

  it('should navigate to a next page', function () {
    var data = [1, 2, 3, 4, 5, 6, 7, 8, 9],
      paginated = new Paginator({
        data: data,
        pageSize: 5
      });

    expect(paginated.getPaginatedData()).toEqual([1, 2, 3, 4, 5]);
    paginated.next();
    expect(paginated.getPaginatedData()).toEqual([6, 7, 8, 9]);
  });

  it('should navigate to a previous page', function () {
    var data = [1, 2, 3, 4, 5, 6, 7, 8, 9],
      paginated = new Paginator({
        data: data,
        pageSize: 5
      });

    expect(paginated.getPaginatedData()).toEqual([1, 2, 3, 4, 5]);
    paginated.next();
    expect(paginated.getPaginatedData()).toEqual([6, 7, 8, 9]);
    paginated.previous();
    expect(paginated.getPaginatedData()).toEqual([1, 2, 3, 4, 5]);
  });

  it('should keep a reference to the array on setData', function () {
    var data = [1, 2, 3, 4, 5, 6, 7, 8, 9],
      paginated = new Paginator({
        data: data,
        pageSize: 5
      });

    var a = paginated.data;
    paginated.setData([1, 2, 3]);
    expect(paginated.data).toBe(a);
  });

  it('should expose if page has next', function () {
    var data = [1, 2, 3, 4, 5, 6, 7, 8, 9],
      paginated = new Paginator({
        data: data,
        pageSize: 5
      });

    expect(paginated.hasNext()).toBeTruthy();
    paginated.setPage(2);
    expect(paginated.hasNext()).toBeFalsy();
  });

  it('should expose if page has previous', function () {
    var data = [1, 2, 3, 4, 5, 6, 7, 8, 9],
      paginated = new Paginator({
        data: data,
        pageSize: 5
      });

    paginated.setPage(2);
    expect(paginated.hasPrevious()).toBeTruthy();
    paginated.setPage(1);
    expect(paginated.hasPrevious()).toBeFalsy();
  });

  it('should expose page objects', function () {
    var data = [1, 2, 3, 4, 5, 6, 7, 8, 9],
      paginated = new Paginator({
        data: data,
        pageSize: 5
      });
    expect(paginated.pages.length).toBe(2);
  });

  it('should update number of pages on data change', function() {
    var data = [1, 2, 3, 4, 5, 6, 7, 8, 9],
      paginated = new Paginator({
        data: data,
        pageSize: 5
      });

    paginated.setData([1,2]);
    expect(paginated.pages.length).toBe(1);
  });

});