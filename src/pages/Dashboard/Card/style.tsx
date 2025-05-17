import styled from "styled-components";

export const CardContainer = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 15px;
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    transform: scale(1.03);
    background: rgba(255, 255, 255, 0.1);
  }
`;

export const CoverImage = styled.img`
  width: 100%;
  border-radius: 5px;
  margin-bottom: 10px;
`;

export const Title = styled.h3`
  margin: 0;
  font-size: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Artist = styled.p`
  margin: 5px 0 0;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.875rem;
`;
