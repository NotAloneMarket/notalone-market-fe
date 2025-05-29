import styled from "styled-components";

export const OuterWrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  background-color: #f3f4f6;
`;

export const AppContainer = styled.div`
  width: 100%;
  max-width: 390px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
`;

export const MainContent = styled.main`
  flex-grow: 1;
  overflow-y: auto;
  margin-top: ${({ $searchOpen }) => ($searchOpen ? "0px" : "56px")};
  transition: margin-top 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
`;

export const TopNavSpacer = styled.div`
  height: 56px;
  flex-shrink: 0;
`;
