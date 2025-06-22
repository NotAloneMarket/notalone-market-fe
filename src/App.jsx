// src/App.jsx
import AppRoutes from "./routes/AppRoutes";
import GlobalStyle from "./styles/GlobalStyle"; // 위치 맞게 수정

function App() {
  return (
    <>
      <GlobalStyle />
      <AppRoutes />
    </>
  );
}

export default App;
