import styled from 'styled-components/native';

export const BG = styled.View`
flex:1;
background-color: #131313;
align-items: center;
padding-top:5%;
`;
export const InputArea = styled.View`
width:100%;
align-items:center;
`;
export const Input = styled.TextInput.attrs({
    placeholderTextColor: 'grey',
})`
height:50px;
width:90%;
padding-left:20px;
margin-top:10px;
background-color: rgba(255,255,255, 0.8);
font-size:17px;
border-radius: 10px;
`;
export const InputName = styled.TextInput.attrs({
    placeholderTextColor: 'grey',
})`
height:50px;
width:90%;
padding-left:20px;
margin-top:10px;
background-color: rgba(255,255,255, 0.2);
color: white;
font-size:17px;
border-radius: 10px;
`;
export const Button = styled.TouchableOpacity`
height:50px;
width:90%;
margin-top:10px;
align-items:center;
justify-content:center;
background-color:#6F58C9;
border-radius: 10px;
margin-bottom:10px;
`;
export const PiecesArea = styled.View`
flex:1;
width:100%;
align-items:center;
`;
export const TitlePiece = styled.View`
padding-top:10px;
padding-bottom:5px;
width:100%;
flex-direction: row;
justify-content:space-between;
align-items:center;
`;
export const BtnArea = styled.View`
flex-direction:row;
`;
export const BtnAdd = styled.TouchableOpacity`
background-color: #6F58C9;
justify-content: center;
align-items:center;
height: 40px;
border-radius: 10px;
margin-right:5%;
padding-right:10px;
padding-left:10px;
`;
export const BtnCancel = styled.TouchableOpacity`
background-color: #B6B8D6;
justify-content: center;
align-items:center;
height: 40px;
border-radius: 10px;
margin-right:5%;
padding-right:10px;
padding-left:10px;
`;
export const List = styled.FlatList`
margin-top:5px;
background-color:rgba(255,255,255,0.05);
border-radius:7px;
width: 90%;
`;