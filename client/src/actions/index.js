import ApolloClient from "apollo-boost";

import gql from "graphql-tag";


const API_URL = "http://192.168.1.8:3001/graphql/";
const client = new ApolloClient({
  uri: API_URL,
});

// LOAD CONTACTS START

export const loadContactsSuccess = (phones) => ({
  type: "LOAD_CONTACT_SUCCESS",
  phones,
});

export const loadContactsFailure = () => ({
  type: "LOAD_CONTACT_FAILURE",
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
  return (dispatch) => {
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