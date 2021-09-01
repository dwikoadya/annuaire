const initState = {
  contacts: [],
  page: 1,
  pages: 0,
  isSearch: false,
  filtername: "",
  filterPhone: "",
};

const contacts = (state = initState, action) => {
  switch (action.type) {
    case "LOAD_CONTACT_SUCCESS":
    return {
      ...state,
      contacts: action.phones.items.map((item) => {
        item.sent = true;
        return item;
      }),
      pages: Math.ceil(action.phones.count / 5),
    };
    case 'LOAD_CONTACT_FAILURE':
    default:
      return state;
  }
};

export default contacts;
