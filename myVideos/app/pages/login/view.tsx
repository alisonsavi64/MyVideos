import React, { useContext } from 'react';
import { View, StyleSheet, SafeAreaView, Text, TextInput, Button } from 'react-native';
import useLoginViewModel from './view.model';

const LoginView: React.FC = () => {

    const { email, password, setEmail, setPassword, isLoading, onSubmit } = useLoginViewModel();
    return <SafeAreaView style={styles.container}>
        <View>
            <Text>E-mail</Text>
            <TextInput value={email} onChangeText={setEmail} placeholder='user@test.com' />
            <Text>Password</Text>
            <TextInput value={password} onChangeText={setPassword} placeholder='************' />
            <Button color={styles.button.color} title="Login" onPress={onSubmit} disabled={isLoading} />
        </View>
    </SafeAreaView>;

}

export default LoginView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: 'black'
    },
    button: {
        color: '#FFA500'
    },
})