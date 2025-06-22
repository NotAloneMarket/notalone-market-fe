import styled from "styled-components";

export const Container = styled.div`
  background-color: white;
  min-height: 100vh;
  max-width: 390px;
  margin: 0 auto;
  padding-bottom: 4rem;
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const CategoryBar = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 0.8rem 1rem;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const CategoryButton = styled.button`
  white-space: nowrap;
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
  border-radius: 9999px;
  border: 1px solid ${({ active }) => (active ? "#3b82f6" : "#d1d5db")};
  background-color: ${({ active }) => (active ? "#3b82f6" : "white")};
  color: ${({ active }) => (active ? "white" : "#4b5563")};
`;

export const ProductList = styled.div`
  padding: 1rem;
  overflow-y: auto;
`;

export const ProductItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #e5e7eb;
  &:first-child {
    padding-top: 0;
  }
`;

export const ProductImage = styled.img`
  width: 4rem;
  height: 4rem;
  object-fit: cover;
  border-radius: 0.375rem;
  margin-right: 1rem;
`;

export const ProductInfo = styled.div`
  flex: 1;
`;

export const ProductTitle = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

export const ProductSub = styled.div`
  font-size: 0.75rem;
  color: #9ca3af;
  margin-bottom: 0.25rem;
  text-align: right;
`;

export const ProductFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 32px;
`;

export const ProductPrice = styled.div`
  font-size: 0.875rem;
  font-weight: bold;
`;

export const ChatDots = styled.div`
  display: flex;
  gap: 0.25rem;
  align-items: center;
  font-size: 0.875rem;
  color: #3b82f6;
`;
export const FloatingWrapper = styled.div`
  position: relative;
  flex: none;
`;

export const FloatingButton = styled.button`
  position: fixed;
  bottom: 5rem;
  left: 50%;
  transform: translateX(130px);

  width: 3rem;
  height: 3rem;
  background-color: #3b82f6;
  color: white;
  border-radius: 9999px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
  border: none;
  cursor: pointer;

  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

export const SearchBox = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  background-color: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
`;

export const SearchInput = styled.input`
  flex: 1;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  border: 1px solid #d1d5db;
  font-size: 0.875rem;
  background-color: white;
`;

export const NoResultMessage = styled.div`
  text-align: center;
  padding: 40px 0;
  font-size: 16px;
  color: #777;
`;
