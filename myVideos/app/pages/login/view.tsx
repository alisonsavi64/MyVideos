import React from 'react';
import { View, StyleSheet, SafeAreaView, Text, TextInput, TouchableOpacity } from 'react-native';
import useLoginViewModel from './view.model';

const LoginView: React.FC = () => {
    const { email, password, setEmail, setPassword, isLoading, onSubmit } = useLoginViewModel();

    return (
        <SafeAreaView style={styles.body}>
            <View style={styles.container}>
                <Text style={styles.titleText}>Entrar</Text>
                <Text style={styles.textWhite}>E-mail</Text>
                <TextInput
                    style={styles.textInput}
                    value={email}
                    onChangeText={setEmail}
                    placeholder='user@test.com'
                    placeholderTextColor="#888"
                />
                <Text style={styles.textWhite}>Password</Text>
                <TextInput
                    style={styles.textInput}
                    value={password}
                    onChangeText={setPassword}
                    placeholder='************'
                    secureTextEntry
                    placeholderTextColor="#888"
                />
                <TouchableOpacity
                    style={[styles.button, isLoading && styles.buttonDisabled]}
                    onPress={onSubmit}
                    disabled={isLoading}
                >
                    <Text style={styles.buttonText}>{isLoading ? 'Loading...' : 'Login'}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default LoginView;

const styles = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    container: {
        alignItems: 'center',
        borderRadius: 10,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'black',
        width: '80%',
        maxWidth: 400
    },
    button: {
        backgroundColor: '#FFA500',
        borderRadius: 5,
        paddingVertical: 12,
        paddingHorizontal: 24,
        marginTop: 20,
    },
    buttonDisabled: {
        backgroundColor: '#ccc'
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    textInput: {
        width: '100%', 
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
    },
    textWhite: {
        color: 'white',
        fontSize: 16,
        marginVertical: 5,
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
    },
});
