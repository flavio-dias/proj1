import styled from 'styled-components/native';

export const Card = styled.View`
width:100%;
height:80px;
border-bottom-left-radius:10px;
border-top-left-radius:10px;
margin-bottom:10px;
background-color: #7E78D2;
flex-direction:row;
align-items:center;
justify-content:center;
`;
export const InfoArea = styled.View`
flex:1;
padding-top:10px;
padding-bottom:10px;
padding-left:15px;
`;
export const IconsArea = styled.View`
flex-direction:row;
justify-content:flex-end;
width:30%;
height:100%;
`;
export const CardBtn = styled.TouchableOpacity`
align-items:flex-end;
padding-right:15px;
justify-content:center;
flex:1;
`;