const initState = {
  contacts: [],
  page: 1,
  pages: 0,
  isSearch: false,
  filtername: '',
  filterPhone: '',
};

const contacts = (state = initState, action) => {
  switch (action.type) {
    case 'LOAD_CONTACT_SUCCESS':
      return {
        ...state,
        contacts: action.phones.items.map(item => {
          item.sent = true;
          return item;
        }),
        pages: Math.ceil(action.phones.count / 5),
      };
    case 'POST_CONTACT':
      return {
        ...state,
        contacts: [
          ...state.contacts,
          {
            id: action.id,
            name: action.name,
            phone: action.phone,
            avatar: action.avatar,
            sent: true,
          },
        ],
      };

    case 'POST_CONTACT_SUCCESS':
      return {
        ...state,
        contacts: state.contacts.map(item => {
          item.sent = true;
          return item;
        }),
      };

    case 'POST_CONTACT_FAILURE':
      return {
        ...state,
        contacts: state.contacts.map(item => {
          if (item.id === action.id) {
            item.sent = false;
          }
          return item;
        }),
      };
    case 'ON_UPDATE_CONTACT':
      console.log('lagi update')
      return {
        ...state,
        contacts: state.contacts.map(item => {
          if (item.id === action.id) {
            item.isEditing = true;
          }
          return item;
        }),
      };

    case 'OFF_UPDATE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.map(item => {
          if (item.id === action.id) {
            item.isEditing = false;
          }
          return item;
        }),
      };

    case 'UPDATE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.map(item => {
          if (item.id === action.id) {
            item.name = action.name;
            item.phone = action.phone;
            item.avatar = action.avatar;
          }
          return item;
        }),
      };

    case 'UPDATE_CONTACT_SUCCESS':
      return {
        ...state,
        contacts: state.contacts.map(item => {
          item.sent = true;
          item.isEditing = false;
          return item;
        }),
      };

    case 'UPDATE_CONTACT_FAILURE':
      return {
        ...state,
        contacts: state.contacts.map(item => {
          if (item.id === action.id) {
            item.sent = false;
          }
          return item;
        }),
      };

    case 'LOAD_CONTACT_FAILURE':
    default:
      return state;
  }
};

export default contacts;
