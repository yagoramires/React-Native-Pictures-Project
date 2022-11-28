import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase/config';

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigation.navigate('Login');
      }
    });
  });

  const logout = () => {
    signOut(auth);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
