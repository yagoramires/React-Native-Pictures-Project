import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, logout } from '../firebase/config';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigation.navigate('Login');
      }
    });
  }, [auth]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <KeyboardAvoidingView
          style={styles.app}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View
            style={{
              width: '90%',
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}
          >
            <Pressable onPress={logout}>
              <Icon name='logout' size={20} style={{ color: '#ff6969' }} />
            </Pressable>
          </View>
          <Pressable
            onPress={() => {
              navigation.navigate('New');
            }}
            style={{ width: '70%' }}
          >
            <View style={[styles.card, styles.shadowProps]}>
              <Icon name='camera-alt' size={150} style={{ color: '#515C6F' }} />
              <Text style={styles.text}>Take a picture</Text>
            </View>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate('Posts');
            }}
            style={{ width: '70%' }}
          >
            <View style={[styles.card, styles.shadowProps]}>
              <Icon
                name='photo-library'
                size={150}
                style={{ color: '#515C6F' }}
              />
              <Text style={styles.text}>See others pictures</Text>
            </View>
          </Pressable>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  app: {
    alignItems: 'center',
  },

  card: {
    marginTop: 20,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 30,
    backgroundColor: '#727C8E',
    borderRadius: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  text: {
    color: 'white',
    fontSize: 20,
    textTransform: 'uppercase',
    fontWeight: '700',
  },

  shadowProps: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.9,
    shadowRadius: 3,
    elevation: 3,
  },
});
