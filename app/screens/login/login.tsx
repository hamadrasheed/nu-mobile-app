import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  SafeAreaView
} from 'react-native';
import { loginUser } from '../../../context/authSlice';
import { useRouter } from 'expo-router';

import { useSelector, useDispatch } from 'react-redux';
import { Header } from '@/components/header/header';

const LoginScreen = () => {



  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();

  const isLogin = useSelector((selector: any) => selector.auth);



  const handleLogin = async () => {

    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    const resultAction = await dispatch(loginUser({ email, password }));

    if (loginUser.fulfilled.match(resultAction)) {      
      Alert.alert('Success', 'Login Successful');
      setTimeout(() => router.push('/'), 1000);
      router.push('/');
    } else {
      Alert.alert('Error', resultAction.payload || 'Login failed');
    }

  };

  const { loading } = isLogin;

  return (

    <SafeAreaView style={styles.HeaderContainer}>
      <Header title="Lexus NU" />

    <View style={styles.container}>
      

      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {/* {error && <Text style={styles.error}>{error}</Text>} */}
      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Login</Text>}
      </TouchableOpacity>
    </View>

    </SafeAreaView>

    
  );
};

const styles = StyleSheet.create({
  HeaderContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#3f51b5',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default LoginScreen;
