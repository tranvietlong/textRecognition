import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import TextRecognition from 'react-native-text-recognition';
// import TextRecognition from '@react-native-ml-kit/text-recognition';

export default function App() {
  const [text, setText] = useState(null);
  const [imageUri, setImageUri] = useState(null);

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

  useEffect(() => {
    (async () => {
      if (imageUri) {
        const result = await TextRecognition.recognize(imageUri.path);
        setText(result);
      }
    })();
  }, [imageUri]);

  const Item = ({title}) => <Text style={styles.item}> * {title}</Text>;

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>Text Recognition</Text>
      <View>
        {/* <TouchableOpacity style={styles.button} onPress={openCamera}>
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity> */}
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
      {/* {text ? <Text>{text}</Text> : null} */}
    </SafeAreaView>
  );
}

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
