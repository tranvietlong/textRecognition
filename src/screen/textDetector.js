import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import RNTextDetector from 'react-native-text-detector';
import ImagePicker from 'react-native-image-crop-picker';

const textDetector = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [text, setText] = useState(null);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [imageUri, setImageUri] = useState(null);

  const openCamera = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission given');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
    // end to require permissions android

    ImagePicker.openCamera({
      width: 1000,
      height: 700,
      cropping: true,
      freeStyleCropEnabled: true,
      useFrontCamera: true,
    }).then(image => {
      if (image) {
        setImageUri(image);
      } else {
        console.log('we cannot access the image');
      }
    });
  };

  const openLibrary = () => {
    ImagePicker.openPicker({
      width: 1000,
      height: 700,
      cropping: true,
      freeStyleCropEnabled: true,
    }).then(image => {
      if (image) {
        setImageUri(image);
      } else {
        console.log('we cannot access the image');
      }
    });
  };

  // const detectText = async () => {
  //   try {
  //     const options = {
  //       quality: 0.8,
  //       base64: true,
  //       skipProcessing: true,
  //     };
  //     const {uri} = await this.camera.takePictureAsync(options);
  //     const visionResp = await RNTextDetector.detectFromUri(uri);
  //     console.log('visionResp', visionResp);
  //   } catch (e) {
  //     console.warn(e);
  //   }
  // };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    (async () => {
      if (imageUri) {
        // console.log('img', imageUri);
        const result = await RNTextDetector.detectFromUri(imageUri.path);
        console.log('rs', result);
        setText(result);
      }
    })();
  }, [imageUri]);

  const Item = ({title}) => <Text style={styles.item}> * {title}</Text>;

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>Text Detector</Text>
      <View>
        <TouchableOpacity style={styles.button} onPress={openCamera}>
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={openLibrary}>
          <Text style={styles.buttonText}>Pick a Photo</Text>
        </TouchableOpacity>
        {imageUri ? (
          <Image source={{uri: imageUri.path}} style={styles.image} />
        ) : null}
      </View>
      <FlatList
        data={text}
        renderItem={({item}) => <Item title={item} />}
        keyExtractor={item => item}
        style={styles.flatList}
      />
    </SafeAreaView>
  );
};

export default textDetector;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 35,
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#47477b',
    color: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 50,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
  },
  image: {
    resizeMode: 'stretch',
    borderColor: 'pink',
    borderWidth: 2,
    height: 200,
    width: 350,
    marginTop: 30,
    borderRadius: 10,
  },
  flatList: {
    paddingVertical: 30,
  },
  item: {
    padding: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
