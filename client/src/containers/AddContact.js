import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
  Image,
  SafeAreaView,
  PermissionsAndroid,
  TextInput,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

import Header from '../components/Header';
import ModalScene from '../components/modal/ModalScene';
import ModalContent from '../components/modal/ModalContent';

export default class AddContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      uploading: false,
      transferred: 0,
      avatar: null,
      modalVisible: false,
    };

    this.handleRequestCameraPermission =
      this.handleRequestCameraPermission.bind(this);
    this.handleRequestExternalWritePermission =
      this.handleRequestExternalWritePermission.bind(this);
    this.handleLaunchCamera = this.handleLaunchCamera.bind(this);
    this.handleSelectImage = this.handleSelectImage.bind(this);
    this.handleUploadImage = this.handleUploadImage.bind(this);
    this.handleToggleModal = this.handleToggleModal.bind(this);
  }

  async handleRequestCameraPermission() {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  }

  async handleRequestExternalWritePermission() {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  }

  async handleLaunchCamera() {
    const options = {
      maxWidth: 2000,
      maxHeight: 2000,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    let isCameraPermitted = await this.handleRequestCameraPermission();
    let isStoragePermitted = await this.handleRequestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          const source = {uri: response.assets[0].uri};
          this.setState({image: source});
          this.setState({modalVisible: !this.state.modalVisible});
        }
      });
    }
  }

  handleSelectImage() {
    const options = {
      maxWidth: 2000,
      maxHeight: 2000,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.assets[0].uri};
        this.setState({image: source});
        this.setState({modalVisible: !this.state.modalVisible});
      }
    });
  }

  async handleUploadImage() {
    const {uri} = this.state.image;
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

    this.setState({uploading: true});
    this.setState({transferred: 0});

    const task = storage().ref(filename).putFile(uploadUri);

    task.on('state_changed', snapshot => {
      this.setState({
        transferred:
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000,
      });
    });

    try {
      await task;
      const url = await storage().ref(filename).getDownloadURL();
      this.setState({avatar: url});
    } catch (error) {
      console.log(error);
    }

    this.setState({uploading: false});

    Alert.alert('Photo uploaded', 'Your Photo has been uploaded to firebase');

    this.setState({image: null});
  }

  handleToggleModal() {
    this.setState({modalVisible: !this.state.modalVisible});
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Header label="Add Contact" />
        <View style={styles.imgPrev}>
          <TouchableOpacity
            style={styles.imageFB}
            onPress={this.handleToggleModal}>
            <ModalScene
              isVisible={this.state.modalVisible}
              onSwipeComplete={this.close}
              onBackButtonPress={this.handleToggleModal}
              onBackdropPress={this.handleToggleModal}>
              <ModalContent
                label="Take a Photo"
                onPress={this.handleLaunchCamera}
              />
              <ModalContent
                label="Choose Image From Gallery"
                onPress={this.handleSelectImage}
              />
              <ModalContent label="Cancel" onPress={this.handleToggleModal} />
            </ModalScene>
            {this.state.image ? (
              <Image
                source={{uri: this.state.image.uri}}
                style={styles.imageFirebase}></Image>
            ) : (
              <Image
                style={styles.imageFirebase}
                source={require('../assets/dummyavatar.jpeg')}></Image>
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.input}>
          <TextInput style={styles.inputContext} placeholder="Name" />
          <TextInput style={styles.inputContext} placeholder="Phone" />
        </View>
        <View style={styles.imageContainer}>
          <TouchableOpacity style={styles.uploadButton}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.uploadButton}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: 'gainsboro',
  },
  uploadButton: {
    borderRadius: 5,
    width: 150,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    // marginVertical: 20,
    marginHorizontal: 20,
    // backgroundColor: 'white'
    // borderWidth: 1,
  },
  buttonText: {
    // color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    // backgroundColor: 'red'
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginHorizontal: 30,
    borderTopWidth: 1,
    // backgroundColor: 'blue'
  },
  imageFirebase: {
    width: 100,
    height: 100,
    borderRadius: 75,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageFB: {
    borderRadius: 50,
    width: 100,
    height: 100,
    marginTop: 30,
    marginHorizontal: 30,
  },
  input: {
    marginVertical: 30,
    marginHorizontal: 20,
    // backgroundColor: 'red',
    flex: 1,
    flexDirection: 'column',
  },
  inputContext: {
    height: 50,
    margin: 12,
    borderBottomWidth: 1,
    // padding: 10,
    justifyContent: 'center',
    // backgroundColor: 'yellow'
  },
  imgPrev: {
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
