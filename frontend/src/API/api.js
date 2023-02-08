const getRequest = function (url) {
  return fetch(url, {
    method: "GET",
  });
};
const createRequest = function (url, body) {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: new Headers({
      "Content-type": "application/json",
    }),
  });
};
const deleteRequest = function (url) {
  return fetch(url, {
    method: "DELETE",
  });
};
const updateRequest = function (url, body) {
  return fetch(url, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: new Headers({
      "Content-type": "application/json",
    }),
  });
};

export const API = {
  baseURL: "http://localhost:3000",

  users: {
    endpoint: function () {
      return API.baseURL + "/user";
    },
    createUrl: function (body) {
      return createRequest(this.endpoint(), body);
    },
    conectUrl: function (body) {
      return createRequest(this.endpoint(), +"/" + "login", body);
    },
    updteUrl: function (body, id) {
      return updateRequest(this.endpoint + "/" + id, body);
    },
    readAll: function () {
      return getRequest(this.endpoint());
    },
    readById: function (id) {
      return getRequest(this.endpoint + "/" + id);
    },
    deleteUrl: function (id) {
      return deleteRequest(this.endpoint + "/" + id);
    },
  },
};
