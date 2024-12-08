import { routes } from '@/app/navigation/routes';
import { Header } from '@/components/header/header';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  SafeAreaView
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { registerUser } from '../../../context/authSlice';

export const RegisterPage = ({ navigation }) => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('guest'); // Default selection
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const { user } = useSelector((state: any) => state.auth);
  
  useEffect(() => {
    
    if (user?.role?.slug == 'admin') {
      setIsAdmin(true);
      setUserType('staff');
    }

  }, [user?.role?.slug]);


  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const handleSignup = async () => {
    if (!firstName.trim()) {
      Alert.alert('Validation Error', 'First name is required.');
      return;
    }
    if (!lastName.trim()) {
      Alert.alert('Validation Error', 'Last name is required.');
      return;
    }
    if (!email.trim() || !validateEmail(email)) {
      Alert.alert('Validation Error', 'Enter a valid email address.');
      return;
    }
    if (!validatePassword(password)) {
      Alert.alert(
        'Validation Error',
        'Password must be at least 6 characters long.'
      );
      return;
    }

    const resultAction = await dispatch(registerUser({ email, password, firstName, lastName, roleSlug: userType }));

    if (registerUser.fulfilled.match(resultAction)) {     
      if(isAdmin) {
        Alert.alert('Success', `New Staff member (${firstName} ${lastName}) registered successfuly!`);
        return;
      } 
      
      Alert.alert('Success', `Please login to Continue!`);
      navigation.navigate(routes.LOGIN);

    } else {
      Alert.alert('Error', resultAction.payload || 'Registration failed');
    }


  };

  return (
    <SafeAreaView style={styles.HeaderContainer}>

      <Header title="Lexus NU" />
      <ScrollView contentContainerStyle={styles.container}>

        <Text style={styles.title}> {isAdmin ? 'Create a Staff Member': 'Register'}</Text>

        {/* First Name */}
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />

        {/* Last Name */}
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />

        {/* Email */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        {/* Password */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {/* Radio Buttons for User Type */}
        {/*       
        <View style={styles.radioGroup}>
          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => setUserType('guest')}
          >
            <View
              style={[
                styles.radioCircle,
                userType === 'guest' && styles.radioSelected,
              ]}
            />
            <Text style={styles.radioText}>Guest</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => setUserType('staff')}
          >
            <View
              style={[
                styles.radioCircle,
                userType === 'staff' && styles.radioSelected,
              ]}
            />
            <Text style={styles.radioText}>Staff</Text>
          </TouchableOpacity>
        </View> */}


        {/* Signup Button */}
        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
          <Text style={styles.signupButtonText}>Create Account</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterPage;

const styles = StyleSheet.create({
  HeaderContainer: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  radioGroup: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#3f51b5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    backgroundColor: '#3f51b5',
  },
  radioText: {
    marginLeft: 5,
    fontSize: 16,
  },
  signupButton: {
    backgroundColor: '#3f51b5',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
