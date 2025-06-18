# 웹뷰

## 화면 보여주기

```
import WebView from "react-native-webview";

export default function Index() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "red" }} edges={["top"]}>
      <StatusBar style="light" />
      <!-- 아이폰 일경우만 로컬호스트가 작동하고, 실제 ip 쓰거나 안드로이드 에뮬레이터 일 경우 10.0.2.2 사용 -->
      <WebView source={{ uri: "http://localhost:3000" }} />
    </SafeAreaView>
  );
}
```

위와 같은 형태로 웹뷰 컴포넌트에 uri를 전달해주면 해당 주소의 화면을 보여준다.

## 인터넷이 연결되지 않았을 경우 처리하기

@react-native-community/netinfo를 통해서 인터넷 상태를 확인하고 대체 화면을 보여줄 수 있다.

```
npx expo install @react-native-community/netinfo
```

```tsx
const [isConnected, setIsConnected] = useState(false);

useEffect(() => {
  NetInfo.addEventListener((state) => {
    setIsConnected(state.isConnected ?? false);
  });
}, []);

if (!isConnected) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "red" }} edges={["top"]}>
      <StatusBar style="light" />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>인터넷 연결을 해주세요.</Text>
      </View>
    </SafeAreaView>
  );
}
```

대략적으로 위와 같은 형태가 되는데 expo 문서에 보면 이벤트를 해제할 수 있는 방법도 나와 있다.

```tsx
const unsubscribe = NetInfo.addEventListener((state) => {
  console.log("Connection type", state.type);
  console.log("Is connected?", state.isConnected);
});

// To unsubscribe to these update, just use:
unsubscribe();
```

unsubscribe를 useEffect의 클리어 함수에 넣어주면 될 것 같다.
