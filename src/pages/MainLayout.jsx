import BottomNav from "@/components/BottomNav";
import TopNav from "@/components/TopNav";
import * as S from "./MainLayout.styles";

export default function MainLayout({ children }) {
  return (
    <S.OuterWrapper>
      <S.AppContainer>
        <TopNav />
        <S.MainContent>{children}</S.MainContent>
        <BottomNav />
      </S.AppContainer>
    </S.OuterWrapper>
  );
}
