import styled from "styled-components";

export const PageWrapper = styled.div`
  background-color: white;
  min-height: 100vh;
  max-width: 390px;
  width: 100%;
  margin: 0 auto;
  padding-bottom: 4rem;

  display: flex;
  flex-direction: column;
`;

export const TestBox = styled.div`
  color: #4d7adb;
  font-size: 1.25rem;
  font-weight: bold;
  border: 1px solid red;
  padding: 8px;
  margin: 0 1rem;
`;

export const Header = styled.header`
  height: 90px;
  display: flex;
  align-items: center;
  padding: 0 23px;
  border-bottom: 1px solid #ddd;
  gap: 8px;

  svg {
    color: #4d7adb;
    cursor: pointer;
  }
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #4d7adb;
`;

export const Main = styled.main`
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
export const OrderItem = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding: 0 0 12px;
`;

export const Image = styled.img`
  width: 69px;
  height: 69px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 1rem;
`;

export const OrderInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const OrderDate = styled.div`
  font-size: 0.75rem;
  color: #888;
  margin-bottom: 4px;
`;

export const OrderTitle = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 4px;
`;

export const OrderQty = styled.div`
  font-size: 0.75rem;
  color: #888;
  margin-bottom: 4px;
`;

export const OrderPrice = styled.div`
  font-size: 1rem;
  font-weight: 600;
  white-space: nowrap;
`;

export const OrderRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  min-width: 80px;
`;
