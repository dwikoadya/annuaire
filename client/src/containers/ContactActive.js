import { connect } from 'react-redux'

import { resendContact, deleteContact, onUpdateContact } from '../actions';

import Contact from '../components/Contacts'

const mapDispatchToProps = (dispatch, ownProps) => ({
  onDelete: () => dispatch(deleteContact(ownProps.id)),
  onResend: () => dispatch(resendContact(ownProps.id, ownProps.name, ownProps.phone)),

  onUpdateContact: () => dispatch(onUpdateContact(ownProps.id))
})

export default connect(
  null,
  mapDispatchToProps
)(Contact)