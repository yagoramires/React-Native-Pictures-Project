import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  StatusBar,
  KeyboardAvoidingView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { auth, storage, db } from '../firebase/config';

import { collection, addDoc, Timestamp, setDoc, doc } from 'firebase/firestore';

const NewPost = ({ navigation }) => {
  const [image, setImage] = useState();
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const [imageURL, setImageURL] = useState('');
  const [progress, setProgress] = useState(0);

  const imagePickerCall = async (type) => {
    let data;

    if (type === 'camera') {
      data = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });
    }

    if (type === 'gallery') {
      data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });
    }

    if (!data) {
      return;
    }

    setImage(data.assets[0]);
  };

  const uploadImage = async () => {
    if (!image) {
      alert('Send an image');
      return;
    }

    const generateName = `images/${Date.now()}.jpg`;
    const storageRef = ref(storage, generateName);

    // converter em um array de bytes
    const img = await fetch(image.uri);
    const bytes = await img.blob();

    const uploadTask = uploadBytesResumable(storageRef, bytes);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(uploadProgress);
      },
      (error) => {
        alert(error.message);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        createDocInCollection(url, generateName);
      },
    );
  };

  const createDocInCollection = async (url, name) => {
    const ref = collection(db, 'posts');
    const data = {
      uid: auth.currentUser.uid,
      username: auth.currentUser.displayName,
      fileRef: name,
      description,
      location,
      image: url,
      createdAt: Timestamp.now(),
    };
    console.log(data);
    await addDoc(ref, data);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Menu de navegação */}
      <View style={styles.navbar}>
        <Pressable onPress={() => navigation.navigate('Home')}>
          <Icon name='arrow-back-ios' size={30} style={{ color: '#FF6969' }} />
        </Pressable>
        <Text style={{ fontSize: 25, fontWeight: '700', color: '#FF6969' }}>
          Upload
        </Text>
        <Text>{progress}</Text>
      </View>

      {/* Imagem de preview */}
      {image && (
        <Image source={{ uri: image.uri }} style={styles.previewImage} />
      )}
      {/* Botões de adicionar imagem */}
      <View style={{ flexDirection: 'row' }}>
        <Pressable
          onPress={() => imagePickerCall('camera')}
          style={styles.buttonsContainer}
        >
          <Icon name='add-a-photo' size={30} style={{ color: '#515C6F' }} />
          <Text style={styles.buttonsTexts}>Take a picture</Text>
        </Pressable>
        <Pressable
          onPress={() => imagePickerCall('gallery')}
          style={styles.buttonsContainer}
        >
          <Icon name='collections' size={30} style={{ color: '#515C6F' }} />
          <Text style={styles.buttonsTexts}>Select from gallery</Text>
        </Pressable>
      </View>
      {/* Input de descrição */}
      <View style={styles.inputsContainer}>
        <Text style={styles.inputsLabel}>
          Write a brief description about what you see
        </Text>
        <TextInput
          style={[
            styles.input,
            styles.shadowProps,
            {
              height: 200,
              textAlignVertical: 'top',
              paddingTop: 15,
              shadowOpacity: 0.1,
            },
          ]}
          multiline={true}
          numberOfLines={10}
          placeholder='Write your description'
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
      </View>
      {/* Input de Localização */}
      <View style={[styles.inputsContainer, styles.shadowProps]}>
        <Text style={styles.inputsLabel}>Location</Text>
        <TextInput
          placeholder='Write your location'
          style={[styles.input, styles.shadowProps, { shadowOpacity: 0.1 }]}
          value={location}
          onChangeText={(text) => setLocation(text)}
        />
      </View>
      {/* Botão de submit */}
      <Pressable
        onPress={uploadImage}
        style={[styles.submitBtnContainer, styles.shadowProps]}
      >
        <Text style={styles.submitBtnText}>UPLOAD FILE</Text>
        <View style={styles.submitBtnCircle}>
          <Icon style={styles.submitBtn} name='arrow-forward-ios' size={20} />
        </View>
      </Pressable>
    </KeyboardAvoidingView>
  );
};

export default NewPost;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  navbar: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  previewImage: {
    width: '90%',
    height: 300,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 15,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 15,
  },
  buttonsTexts: {
    fontSize: 15,
    paddingLeft: 10,
    fontStyle: 'italic',
  },
  inputsContainer: {
    width: '90%',
    marginTop: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'column',
  },
  inputsLabel: {
    color: '#515C6F',
  },
  input: {
    marginTop: 10,
    height: 60,
    borderRadius: 10,
    color: '#515C6F',
    fontSize: 15,
    paddingTop: 5,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 5,
    backgroundColor: 'rgb(235,235,235)',
  },

  submitBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 50,
    padding: 8,
    width: '50%',
    marginTop: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: '#FF6969',
  },
  submitBtnText: {
    color: 'white',
    fontWeight: '700',
    paddingLeft: 10,
  },
  submitBtnCircle: {
    backgroundColor: 'white',
    borderRadius: 100,
    padding: 10,
  },
  submitBtn: {
    color: '#FF6969',
  },

  shadowProps: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
});
