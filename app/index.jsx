import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from '../assets/images/logo.png';
import { useEffect, useState } from "react";
import { Redirect } from "expo-router";

const Index = () => {
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setRedirect(true);
        }, 2000);

        return () => clearTimeout(timeoutId);
    }, []);

    if (redirect) {
        return <Redirect href="/home" />;
    }

    return (
        <SafeAreaView className="justify-center items-center bg-[#e2e1e6] h-full">
            <Image source={Logo} resizeMode="contain" className="w-full" />
        </SafeAreaView>
    );
}

export default Index;
