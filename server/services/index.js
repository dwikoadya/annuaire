const firebase = require("firebase");

// //Get Contacts without Pagination
const getContacts = () => {
    const phoneReference = firebase.database().ref("/Phones/");
    return (new Promise((resolve, reject) => {
      phoneReference.on("value", function (snapshot) {
        const folders = snapshot.val();
        if (folders === null) {
          resolve([]);
        } else {
          const data = Object.keys(folders).map(o => Object.assign({ id: o }, folders[o]))
          resolve(data);
        }
        phoneReference.off("value");
      }, (errorObject) => {
        console.log("The read data failed: " + errorObject.code);
        reject("The read data failed: " + errorObject.code);
      });
    }));
  }

//Get Contacts by Pagination
// const getContacts = (offset, limit) => {
//   const phoneReference = firebase.database().ref("/Phones/");
//   return new Promise((resolve, reject) => {
//     phoneReference.on(
//       "value",
//       function (snapshot) {
//         const folders = snapshot.val();
//         if (folders === null) {
//           resolve([]);
//         } else {
//           const data = Object.keys(folders)
//             .map((o) => Object.assign({ id: o }, folders[o]))
//             .splice(offset, limit);
//           resolve(data);
//         }
//         phoneReference.off("value");
//       },
//       (errorObject) => {
//         console.log("The read data failed: " + errorObject.code);
//         reject("The read data failed: " + errorObject.code);
//       }
//     );
//   });
// };

//Get Pages
const getPages = () => {
  const phoneReference = firebase.database().ref("/Phones/");
  return new Promise((resolve, reject) => {
    phoneReference.on(
      "value",
      function (snapshot) {
        const folders = snapshot.val();
        if (folders === null) {
          resolve([]);
        } else {
          const data = Object.keys(folders).map((o) =>
            Object.assign({ id: o }, folders[o])
          ).length;
          resolve(data);
        }
        phoneReference.off("value");
      },
      (errorObject) => {
        console.log("The read data failed: " + errorObject.code);
        reject("The read data failed: " + errorObject.code);
      }
    );
  });
};

//Create New Contact
const createContact = (contact) => {
  const referencePath = `/Phones/${contact.id}/`;
  const phoneReference = firebase.database().ref(referencePath);
  return new Promise((resolve, reject) => {
    phoneReference.set(
      { name: contact.name, phone: contact.phone, avatar: contact.avatar },
      (error) => {
        if (error) {
          reject("Data could not be saved." + error);
        } else {
          resolve(contact);
        }
      }
    );
  });
};

//Update Data Contact
const updateContact = (contact) => {
  var referencePath = `/Phones/${contact.id}/`;
  var phoneReference = firebase.database().ref(referencePath);
  return new Promise((resolve, reject) => {
    phoneReference.update(
      { name: contact.name, phone: contact.phone, avatar: contact.avatar },
      (error) => {
        if (error) {
          reject("Data could not be updated." + error);
        } else {
          resolve(contact);
        }
      }
    );
  });
};

//Delete an instance
const deleteContact = (contact) => {
  var referencePath = `/Phones/${contact.id}/`;
  var phoneReference = firebase.database().ref(referencePath);
  return new Promise((resolve, reject) => {
    phoneReference.remove((error) => {
      if (error) {
        reject("Data could not be deleted." + error);
      } else {
        resolve(contact);
      }
    });
  });
};

//Search Contacts by Pagination
const searchContacts = (name, phone, offset = 0, limit = 5) => {
  let regName = new RegExp(name, "ig");
  let regPhone = new RegExp(phone, "g");
  const phoneReference = firebase.database().ref("/Phones/");
  return new Promise((resolve, reject) => {
    phoneReference.on(
      "value",
      function (snapshot) {
        const folders = snapshot.val();
        if (folders === null) {
          resolve([]);
        } else {
          const data = Object.keys(folders)
            .map((o) => Object.assign({ id: o }, folders[o]))
            .filter((item) => {
              if (name && phone) {
                return item.name.match(regName) && item.phone.match(regPhone);
              } else if (name) {
                return item.name.match(regName);
              } else if (phone) {
                return item.phone.match(regPhone);
              } else {
                return false;
              }
            })
            .splice(offset, limit);
          resolve(data);
        }
        phoneReference.off("value");
      },
      (errorObject) => {
        console.log("The read data failed: " + errorObject.code);
        reject("The read data failed: " + errorObject.code);
      }
    );
  });
};

//Search Contact Pages by Pagination
const searchContactsPages = (name, phone) => {
  let regName = new RegExp(name, "ig");
  let regPhone = new RegExp(phone, "g");

  console.log(regPhone);

  const phoneReference = firebase.database().ref("/Phones/");
  return new Promise((resolve, reject) => {
    phoneReference.on(
      "value",
      function (snapshot) {
        const folders = snapshot.val();
        if (folders === null) {
          resolve([]);
        } else {
          const data = Object.keys(folders)
            .map((o) => Object.assign({ id: o }, folders[o]))
            .filter((item) => {
              if (name && phone) {
                return item.name.match(regName) && item.phone.match(regPhone);
              } else if (name) {
                return item.name.match(regName);
              } else if (phone) {
                return item.phone.match(regPhone);
              } else {
                return false;
              }
            });
          resolve(data.length);
        }
        phoneReference.off("value");
      },
      (errorObject) => {
        console.log("The read data failed: " + errorObject.code);
        reject("The read data failed: " + errorObject.code);
      }
    );
  });
};

// module.exports = { getContacts, createContact, updateContact, deleteContact}

module.exports = {
  getContacts,
  getPages,
  createContact,
  updateContact,
  deleteContact,
  searchContacts,
  searchContactsPages,
};
