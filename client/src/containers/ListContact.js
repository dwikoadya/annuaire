import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, ScrollView} from 'react-native';

import {loadContacts} from '../actions';
import Contact from '../containers/ContactActive';
class ListContact extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.loadContacts();
  }

  render() {
    const nodes = this.props.contacts.map((item, index) => {
      return (
        <Contact
          key={index}
          index={
            this.props.page === 1
              ? index + 1
              : (this.props.page - 1) * 5 + (index + 1)
          }
          id={item.id}
          name={item.name}
          phone={item.phone}
          avatar={item.avatar}
          sent={item.sent}
          navigation={this.props.navigation}
        />
      );
    });

    return (
      <ScrollView>
        <View>{nodes}</View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  contacts: state.contacts.contacts,
  page: state.contacts.page,
  pages: state.contacts.pages,
});

const mapDispatchToProps = dispatch => ({
  loadContacts: () => dispatch(loadContacts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListContact);
