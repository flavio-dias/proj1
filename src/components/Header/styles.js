import styled from 'styled-components/native';

export const TitleBox = styled.View`
flex:1;
display: ${props => props.hasTitle === true ? 'flex' : 'none'};
justify-content: center;
align-items:center;
padding-right : ${props => props.hasSideBtn === true ? '0px' : '10%'}
`;