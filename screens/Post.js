import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

const Post = ({ route, navigation }) => {
  const { itemId } = route.params;

  const [document, setDocument] = useState([]);

  useEffect(() => {
    const loadDocument = async () => {
      const docRef = doc(db, 'posts', itemId);
      const docSnap = await getDoc(docRef);

      setDocument(docSnap.data());
    };
    loadDocument();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Menu de navegação */}
        <View style={styles.navbar}>
          <Pressable onPress={() => navigation.goBack()}>
            <Icon
              name='arrow-back-ios'
              size={30}
              style={{ color: '#FF6969' }}
            />
          </Pressable>
          <Text style={{ fontSize: 25, fontWeight: '700', color: '#FF6969' }}>
            Post
          </Text>
        </View>
        {/* Post Data */}

        <View style={styles.postContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.textName}>{document.username}</Text>
            <Text style={styles.textLocation}>{document.location}</Text>
          </View>

          <Image source={{ uri: document.image }} style={styles.postImage} />

          <Text style={styles.textDescription}>{document.description}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  navbar: {
    width: '55%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: '5%',
  },
  postContainer: {
    marginTop: 20,
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  postImage: {
    width: '100%',
    height: 300,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 15,
    backgroundColor: '#000',
    borderWidth: 4,
    borderStyle: 'solid',
    borderColor: '#FF6969',
  },
  textContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  textName: { fontWeight: '700', color: '#FF6969' },
  textLocation: {
    fontStyle: 'italic',

    color: 'rgb(180,180,180)',
  },
  textDescription: {
    fontSize: 15,
    marginTop: 15,
    color: 'rgb(100,100,100)',
  },
});
