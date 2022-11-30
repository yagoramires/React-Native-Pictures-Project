import {
  FlatList,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { db } from '../firebase/config';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';

const Item = ({ username, location, id, navigation }) => (
  <Pressable
    onPress={() => navigation.navigate('Post', { itemId: id })}
    style={styles.itemContainer}
  >
    <Text style={styles.itemText}>{username}</Text>
    <Text style={styles.itemLocation}>{location}</Text>
  </Pressable>
);

const Posts = ({ navigation }) => {
  const [documents, setDocuments] = useState([]);
  // const [item, setItem] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      const collectionRef = collection(db, 'posts');

      const q = query(collectionRef, orderBy('createdAt', 'desc'));

      onSnapshot(q, (querySnapshot) => {
        setDocuments(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })),
        );
      });
    };
    fetchData();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <Item
        username={item.username}
        description={item.description}
        id={item.id}
        location={item.location}
        navigation={navigation}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Menu de navegação */}
      <View style={styles.navbar}>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon name='arrow-back-ios' size={30} style={{ color: '#FF6969' }} />
        </Pressable>
        <Text style={{ fontSize: 25, fontWeight: '700', color: '#FF6969' }}>
          Posts
        </Text>
      </View>

      <Text style={styles.text}>
        See all the pictures that people are sharing
      </Text>
      {documents.length > 0 && (
        <FlatList
          data={documents}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
    </SafeAreaView>
  );
};

export default Posts;

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
  itemContainer: {
    marginTop: 10,
    backgroundColor: '#FF6969',
    width: '90%',
    marginRight: 'auto',
    marginLeft: 'auto',
    borderRadius: 50,
    paddingVertical: 13,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemText: {
    textTransform: 'uppercase',
    fontWeight: '700',
    color: '#fff',
  },
  itemLocation: {
    color: 'rgb(225,225,225)',
    fontStyle: 'italic',
    paddingLeft: 20,
  },

  text: {
    marginVertical: 20,
    width: '90%',
    marginRight: 'auto',
    marginLeft: 'auto',
    color: '#515C6F',
    textAlign: 'center',
  },
});
