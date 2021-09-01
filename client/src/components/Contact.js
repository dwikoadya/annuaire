import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  Button,
} from 'react-native';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Facebook',
    phone: '081122334455',
    avatar: require('../assets/fb.png'),
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Instagram',
    phone: '082233445566',
    avatar: require('../assets/ig.jpeg'),
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Whatsapp',
    phone: '083344556677',
    avatar: require('../assets/wa.jpeg'),
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d71',
    title: 'Whatsapp',
    phone: '083344556677',
    avatar: require('../assets/wa.jpeg'),
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d73',
    title: 'Whatsapp',
    phone: '083344556677',
    avatar: require('../assets/wa.jpeg'),
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d74',
    title: 'Whatsapp',
    phone: '083344556677',
    avatar: require('../assets/wa.jpeg'),
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d75',
    title: 'Whatsapp',
    phone: '083344556677',
    avatar: require('../assets/wa.jpeg'),
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d76',
    title: 'Whatsapp',
    phone: '083344556677',
    avatar: require('../assets/wa.jpeg'),
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d77',
    title: 'Whatsapp',
    phone: '083344556677',
    avatar: require('../assets/wa.jpeg'),
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d78',
    title: 'Whatsapp',
    phone: '083344556677',
    avatar: require('../assets/wa.jpeg'),
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d79',
    title: 'Whatsapp',
    phone: '083344556677',
    avatar: require('../assets/wa.jpeg'),
  },
];

const Item = ({title, phone, avatar}) => (
  <View style={styles.item}>
    <Image style={styles.avatar} source={avatar}></Image>
    <View style={styles.contact}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.phone}>{phone}</Text>
    </View>
  </View>
);

const App = () => {
  const renderItem = ({item}) => (
    <Item avatar={item.avatar} title={item.title} phone={item.phone} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.header}>Contacts</Text>
      </View>
      <View style={styles.contact}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
        </View>
      <Button
        title="Add Contact"
        style={styles.pencet}
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 5,
    flexDirection: 'column',
    backgroundColor: 'grey',
  },
  box: {
    marginHorizontal: 20,
    flex: 1,
    // backgroundColor: 'grey',
  },
  header: {
    marginVertical: 20,
    marginHorizontal: 10,
    fontSize: 40,
    // backgroundColor: 'green',
  },
  item: {
    padding: 5,
    marginVertical: 8,
    marginHorizontal: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  contact: {
    flex: 4,
    flexDirection: 'column',
    marginHorizontal: 10,
  },
  title: {
    fontSize: 20,
    textAlignVertical: 'center',
  },
  phone: {
    fontSize: 10,
    textAlignVertical: 'center',
  },
  avatar: {
    height: 50,
    width: 50,
    padding: 20,
    borderRadius: 50,
  },
  pencet: {
    flex: 1,
    marginVertical: 5,
    marginHorizontal: 5,
    padding: 20
  },
  list: {
    // backgroundColor: 'skyblue',
    marginVertical: 20,
    marginHorizontal: 30
  }
});

export default App;
