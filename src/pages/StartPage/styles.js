import styled from 'styled-components';
import { Button } from 'semantic-ui-react';

export const Container = styled.div`
  width: 70%;
  margin: 0 auto;
  margin-top: 20px;
`;
export const PostBlock = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  align-items: center;
`;
export const StyledButton = styled(Button)`
  display: block !important;
  margin: 0 auto !important;
`;
