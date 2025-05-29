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
export const KeywordSummary = styled.div`
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  color: #6b7280;

  .highlight {
    font-weight: 600;
    color: black;
  }
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
