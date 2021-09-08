import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
  Image,
  PermissionsAndroid,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

import ModalScene from '../components/modal/ModalScene';
import ModalContent from '../components/modal/ModalContent';
import {postContact} from '../actions';
import ButtonCancel from '../components/button/ButtonCancel';
import ButtonSave from '../components/button/ButtonSave';

class AddContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
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
    this.handleSubmit = this.handleSubmit.bind(this);
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

  async handleSubmit() {
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
    if (this.state.name && this.state.phone && this.state.avatar) {
      this.props.postContact(
        this.state.name,
        this.state.phone,
        this.state.avatar,
      );
    }

    Alert.alert('Contact Saved');

    this.setState({uploading: false});
    this.setState({image: null});
    this.setState({name: ''});
    this.setState({phone: ''});

    this.props.navigation.navigate('Home');
  }

  handleToggleModal() {
    this.setState({modalVisible: !this.state.modalVisible});
  }

  render() {
    return (
      <KeyboardAvoidingView behavior={'height'} style={styles.container}>
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
          <TextInput
            style={styles.inputContext}
            placeholder="Name"
            value={this.state.name}
            onChangeText={name => {
              this.setState({name});
            }}
          />
          <TextInput
            style={styles.inputContext}
            placeholder="Phone"
            keyboardType="numeric"
            value={this.state.phone}
            onChangeText={phone => {
              this.setState({phone});
            }}
          />
        </View>
        <View style={styles.imageContainer}>
          <ButtonSave onPress={this.handle} />
          <ButtonCancel navigation={this.props.navigation} />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gainsboro',
  },
  uploadButton: {
    borderRadius: 5,
    width: 150,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginHorizontal: 30,
    borderTopWidth: 1,
    // backgroundColor: 'pink',
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
    flex: 1,
    flexDirection: 'column',
  },
  inputContext: {
    height: 50,
    margin: 12,
    borderBottomWidth: 1,
    justifyContent: 'center',
  },
  imgPrev: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapDispatchToProps = dispatch => ({
  postContact: (name, phone, avatar) =>
    dispatch(postContact(name, phone, avatar)),
});

export default connect(null, mapDispatchToProps)(AddContact);
