import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import WebView from "react-native-webview";

export default function Index() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "red" }} edges={["top"]}>
      <StatusBar style="light" />
      <WebView source={{ uri: "https://www.naver.com" }} />
    </SafeAreaView>
  );
}
