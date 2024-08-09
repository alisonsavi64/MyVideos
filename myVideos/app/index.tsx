import { Button, Text, View } from "react-native";
import {useRouter} from 'expo-router';

export default function Index() {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
            <Text>Welcome to the Home Page!</Text>
      <Button
        title="Go to Login Page"
        onPress={() => router.push("/pages/login/view")}
      />
    </View>
  );
}
