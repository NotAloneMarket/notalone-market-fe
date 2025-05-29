import { useState } from "react";
import BottomNav from "@/components/BottomNav";
import TopNav from "@/components/TopNav";
import * as S from "./MainLayout.styles";

export default function MainLayout({ children }) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <S.OuterWrapper>
      <S.AppContainer>
        <TopNav searchOpen={searchOpen} setSearchOpen={setSearchOpen} />
        <S.MainContent $searchOpen={searchOpen}>{children}</S.MainContent>
        <BottomNav />
      </S.AppContainer>
    </S.OuterWrapper>
  );
}
