import ApolloClient from 'apollo-boost';

import gql from 'graphql-tag';

const API_URL = 'http://192.168.1.8:3001/graphql/';
const client = new ApolloClient({
  uri: API_URL,
});

// LOAD CONTACTS START

export const loadContactsSuccess = phones => ({
  type: 'LOAD_CONTACT_SUCCESS',
  phones,
});

export const loadContactsFailure = () => ({
  type: 'LOAD_CONTACT_FAILURE',
});

export const loadContacts = (offset = 0, limit = 5) => {
  const phonesQuery = gql`
   query{
      phones(pagination:{offset: ${offset}, limit:${limit}}){
         count
         items{
           id
           name
           phone
           avatar
         }
      }
   }`;
  return dispatch => {
    return client
      .query({
        query: phonesQuery,
      })
      .then(function (response) {
        dispatch(loadContactsSuccess(response.data.phones));
      })
      .catch(function (error) {
        console.log(error);
        dispatch(loadContactsFailure());
      });
  };
};

//LOAD CONTACTS END

// POST CONTACT START
const postContactSuccess = contact => ({
  type: 'POST_CONTACT_SUCCESS',
  contact,
});

const postContactFailure = id => ({
  type: 'POST_CONTACT_FAILURE',
  id,
});

const postContactRedux = (id, name, phone, avatar) => ({
  type: 'POST_CONTACT',
  id,
  name,
  phone,
  avatar,
});

export const postContact = (name, phone, avatar) => {
  const id = new Date().getTime();
  const addQuery = gql`
    mutation addContact(
      $id: ID!
      $name: String!
      $phone: String!
      $avatar: String!
    ) {
      addContact(id: $id, name: $name, phone: $phone, avatar: $avatar) {
        id
        name
        phone
        avatar
      }
    }
  `;

  return dispatch => {
    dispatch(postContactRedux(id, name, phone, avatar));
    return client
      .mutate({
        mutation: addQuery,
        variables: {
          id,
          name,
          phone,
          avatar,
        },
      })
      .then(function (response) {
        dispatch(postContactSuccess(response.data.addContact));
      })
      .catch(function (error) {
        console.log(error);
        dispatch(postContactFailure(id));
      });
  };
};

//POST CONTATCTS END

//START EDIT CONTACT DATA

export const onUpdateContact = id => ({
  type: 'ON_UPDATE_CONTACT',
  id,
});

export const offUpdateContact = id => ({
  type: 'OFF_UPDATE_CONTACT',
  id,
});

const updateContactSuccess = contact => ({
  type: 'UPDATE_CONTACT_SUCCESS',
  contact,
});

const updateContactFailure = id => ({
  type: 'UPDATE_CONTACT_FAILURE',
  id,
});

const updateContactRedux = (id, name, phone, avatar) => ({
  type: 'UPDATE_CONTACT',
  id,
  name,
  phone,
  avatar,
});

export const updateContact = (id, name, phone, avatar) => {
  return dispatch => {
    dispatch(updateContactRedux(id, name, phone, avatar));
    const updateQuery = gql`
      mutation updateContact(
        $id: ID!
        $name: String!
        $phone: String!
        $avatar: String!
      ) {
        updateContact(id: $id, name: $name, phone: $phone, avatar: $avatar) {
          id
          name
          phone
          avatar
        }
      }
    `;
    return client
      .mutate({
        mutation: updateQuery,
        variables: {
          id,
          name,
          phone,
          avatar,
        },
      })
      .then(function (response) {
        dispatch(updateContactSuccess(response.data.updateContact));
      })
      .catch(function (error) {
        console.log(error);
        dispatch(updateContactFailure(id));
      });
  };
};
//EDIT CONTACT DATA END
