import NetInfo from "@react-native-community/netinfo";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import WebView from "react-native-webview";

export default function Index() {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected ?? false);
    });
  }, []);

  const handleButton = () => {
    console.log("모바일 로그!!");
  };

  if (!isConnected) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "red" }} edges={["top"]}>
        <StatusBar style="light" />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>인터넷 연결을 해주세요.</Text>
        </View>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "red" }}
      edges={["top", "bottom"]}
    >
      <StatusBar style="light" />
      <WebView
        webviewDebuggingEnabled={true}
        source={{
          uri: "http://192.168.0.10:3000",
        }}
      />
      <Button title="모바일 버튼" onPress={handleButton} />
    </SafeAreaView>
  );
}
