import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,
  FlatList,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import TextRecognition from 'react-native-text-recognition';
import React, {useState, useEffect} from 'react';

const App = () => {
  const [text, setText] = useState(null);
  const [imageUri, setImageUri] = useState(null);

  const openCamera = async () => {
    //request Using Camera
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
    //end request using Camera

    let options = {
      storageOptions: {
        path: 'images',
        mediaType: 'photo',
        cameraType: 'back',
      },
      includeBase64: true,
      saveToPhotos: true,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        // console.log(' User cancelled image picker');
      } else if (response.error) {
        // console.log('ImagePicker Error', response.error);
      } else if (response.customButton) {
        // console.log('User tapped custom button', response.customButton);
      } else {
        const source = {uri: response.assets[0].uri};
        setImageUri(source);
      }
    });
  };

  const openLibrary = () => {
    let options = {
      storageOptions: {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true,
    };

    launchImageLibrary(options, response => {
      // console.log('res: ', response.assets[0].uri);
      if (response.didCancel) {
        // console.log(' User cancelled image picker');
      } else if (response.error) {
        // console.log('ImagePicker Error', response.error);
      } else if (response.customButton) {
        // console.log('User tapped custom button', response.customButton);
      } else {
        const source = {uri: response.assets[0].uri};
        setImageUri(source);
      }
    });
  };

  useEffect(() => {
    (async () => {
      if (imageUri) {
        const result = await TextRecognition.recognize(imageUri.uri);
        // console.log(image);
        // console.log(result);
        setText(result);
      }
    })();
  }, [imageUri]);

  const Item = ({title}) => <Text style={styles.item}> * {title}</Text>;

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={styles.title}>Text Recognition</Text>
      <View>
        <TouchableOpacity style={styles.button} onPress={openCamera}>
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={openLibrary}>
          <Text style={styles.buttonText}>Pick a Photo</Text>
        </TouchableOpacity>
        {imageUri ? <Image source={imageUri} style={styles.image} /> : null}
      </View>
      <FlatList
        data={text}
        renderItem={({item}) => <Item title={item} />}
        keyExtractor={item => item.id}
        style={styles.flatList}
      />
      {/* {text ? <Text>{text}</Text> : null} */}
    </ScrollView>
  );
};

export default App;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 35,
    marginVertical: 40,
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
