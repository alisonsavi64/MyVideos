import { useState } from 'react';
import { Alert } from 'react-native';
import { login } from '@/app/common/models/repositories/auth.repository';

const useLoginViewModel = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onSubmit = async () => {
        console.log({email, password});
        try{
            setIsLoading(true);
            const response = await login({email, password});
            console.log(response)
        } catch(error) {
            console.log(error)
            Alert.alert("Oops!", "Something went wrong");
        } finally{
            setIsLoading(false);
        }
    }

    /**
     * Binding with the view 
     */
    return {
        email, password, setPassword, setEmail, isLoading, onSubmit
    };
}

export default useLoginViewModel;