import styled from 'styled-components/native';

export const BG = styled.View`
flex:1;
background-color: #131313;
align-items: center;
justify-content: flex-start;
padding-top:5%;
`;
export const ProfileDiv = styled.View`
width: 90%;
flex:2;
padding-top:10px;
padding-bottom:10px;
border-radius:10px;
align-items:center;
justify-content:center;
`;
export const AttDiv = styled.View`
width: 90%;
flex:5;
margin-bottom:15px;
border-radius:5px;
align-items:flex-start;
justify-content:flex-start;
`;
export const AttDivLoad = styled.View`
margin-top:30px;
width: 100%;
margin-bottom:15px;
border-radius:5px;

`;
export const ValueDiv = styled.View`
flex-direction: row;
justify-content:center;
width:100%;
margin-top:10px;
`;
export const AddBtn = styled.TouchableOpacity`
background-color: #6F58C9;
justify-content: center;
align-items:center;
height: 40px;
border-radius: 10px;
margin-left: 15px;
padding-right:12px;
padding-left:12px;
`;
export const Nome = styled.Text`
text-align:center;
font-size: 28px;
color: gray;
`;
export const ExitBtn = styled.TouchableOpacity`
background-color: #B6B8D6;
justify-content: center;
align-items:center;
width:90%;
height: 45px;
border-radius: 10px;
margin-bottom:15px;
`;
export const SubTotal = styled.Text`
text-align:center;
font-size: 28px;
color: #5FD3B4;
`;
export const List = styled.FlatList`
padding-top:10px;
margin-top:10px;
background-color:rgba(255,255,255,0.05);
border-radius:7px;
width: 100%;
`;





