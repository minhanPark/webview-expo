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

## 웹뷰 디버깅

네이티브 코드는 터미널에서 로그를 확인할 수 있다. 하지만 웹뷰에 포함되어 있는 코드는 브라우저에서 콘솔을 찍어야 확인할 수 있다. 이때 브라우저를 켜는게 아니고 에뮬레이터/시뮬레이터의 웹뷰 디버깅을 하려면 브라우저와 연결해주면 상호작용하는 형태로 디버깅도 할 수 있다.

### 기본 설정

```tsx
<WebView
  webviewDebuggingEnabled={true}
  source={{
    uri: uri,
  }}
/>
```

시뮬레이터 버전이 낮아서 그런거일 수도 있지만 webviewDebuggingEnabled은 현재 최신버전에서는 false가 기본 값이다. 웹뷰에서 디버깅을 하기 위해선 해당 값을 true로 설정해줘야 한다.

### ios/시뮬레이터

ios 시뮬레이터에서 웹뷰 디버깅을 하기 위해선 사파리를 활용해야한다.  
사파리 브라우저를 켠 후 왼쪽 상단 메뉴에서 "개발자용" 탭을 찾아야 한다.  
만약 "개발자용" 탭이 보이지 않는다면 사파리의 설정으로 들어가서 "고급" 탭에서 마지막에 "메뉴 막대에서 개발자용 메뉴 보기"를 활성화 한다.
그리고 개발자용 탭에서 시뮬레이터의 웹뷰 페이지를 선택하면 해당 페이지의 콘솔 및 네트워크 등을 확인할 수 있다.

### 안드로이드/에뮬레이터

안드로이드 에뮬레이터가 켜져있다면 브라우저를 열고 chrome://inspect/#devices에 접속한다.  
그러면 디바이스 리스트 부분에 에뮬레이터가 나타나고, 거기에 inspect 버튼이 생긴다.(webviewDebuggingEnabled가 true로 설정되어 있어야 한다.) 해당 버튼을 누르면 디버깅 창이 열리고, 콘솔 및 네트워크 등을 확인할 수 있다.  
리스트에 뜨지 않는 다면 프로젝트와 에뮬레이터를 다시 시작해보자.
