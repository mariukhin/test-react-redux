import styled from 'styled-components';
import { Button } from 'semantic-ui-react';

export const Container = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 60px;
  border-radius: 2px;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
`;
export const Wrapper = styled.div`
  padding: 25px;
`;

export const Span = styled.span`
  display: block;
  width: 100%;
  border-bottom: 1px solid #b9bfc0;
  margin-bottom: 15px;
`;
export const PostTitle = styled.p`
  text-align: center;
  font-size: 34px;
  font-weight: 600;
  margin-bottom: 30px;
`;
export const CreatorText = styled.p`
  text-align: right;
  font-size: 18px;
  margin-bottom: 10px;
`;
export const PostBody = styled.p`
  text-align: justify;
  font-size: 20px;
  line-height: 30px;
  margin-bottom: 15px;
`;
export const ButtonContainer = styled(Button.Group)`
  display: flex !important;
  justify-content: center;
  flex-wrap: nowrap;
  width: 40%;
  margin: 0 auto !important;
`;
export const CommentContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  margin-bottom: 20px;
`;
export const CommentTitle = styled.p`
  text-align: center;
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 30px;
`;
export const CommentText = styled.p`
  text-align: justify;
  font-size: 16px;
  line-height: 20px;
  margin-bottom: 10px;
`;
export const StyledButton = styled(Button)`
  display: block !important;
  margin: 0 auto !important;
  margin-bottom: 20px !important;
`;
