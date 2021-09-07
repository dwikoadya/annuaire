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
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import * as Progress from 'react-native-progress';
import Header from '../components/Header';

export default class AddContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      uploading: false,
      transferred: 0,
      avatar: null,
    };

    this.handleRequestCameraPermission =
      this.handleRequestCameraPermission.bind(this);
    this.handleRequestExternalWritePermission =
      this.handleRequestExternalWritePermission.bind(this);
    this.handleSelectImage = this.handleSelectImage.bind(this);
    this.handleUploadImage = this.handleUploadImage.bind(this);
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

  async handleSelectImage() {
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
        }
      });
    }
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

  render() {
    return (
      <SafeAreaView style={styles.container}>
      <Header label="Add Contact" />
        <TouchableOpacity
          style={styles.imageFB}
          onPress={this.handleSelectImage}>
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
        <View style={styles.imageContainer}>
          {this.state.uploading ? (
            <View style={styles.progressBarContainer}>
              <Progress.Bar progress={this.state.transferred} width={300} />
            </View>
          ) : (
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={this.handleUploadImage}>
              <Text style={styles.buttonText}>Upload Image</Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'gainsboro',
  },
  selectButton: {
    borderRadius: 5,
    width: 150,
    height: 50,
    backgroundColor: '#8ac6d1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadButton: {
    borderRadius: 5,
    width: 150,
    height: 50,
    backgroundColor: '#ffb6b9',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageContainer: {
    marginTop: 30,
    marginBottom: 50,
    alignItems: 'center',
  },
  progressBarContainer: {
    marginTop: 20,
  },
  imageBox: {
    width: 300,
    height: 300,
  },
  imageFirebase: {
    width: 100,
    height: 100,
    borderRadius: 75,
    position: 'absolute',
  },
  imageFB: {
    borderRadius: 50,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
});
