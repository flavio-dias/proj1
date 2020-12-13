import styled from 'styled-components/native';

export const BG = styled.View`
flex:1;
background-color: #131313;
align-items: center;
justify-content: flex-start;
padding-top:5%;
`;
export const SearchBarArea = styled.View`
flex-direction:row;
align-items:center;
padding-left:10px;
width:90%;
height:40px;
border-radius: 5px;
border: 2px solid #7E78D2;
`;
export const SearchBar = styled.TextInput.attrs({
    placeholderTextColor: 'grey',
})`
padding: 0px;
margin-left:20px;
font-size:16px;
text-decoration:none;
color: white;
`;
export const ClientListArea = styled.View`
flex:1;
margin-top:10px;
margin-bottom:10px;
width:100%;
align-items:center;
`;
export const List = styled.FlatList`
background-color:rgba(255,255,255,0.05);
border-radius:7px;
width: 90%;
`;
export const AttDivLoad = styled.View`
margin-top:30px;
width: 100%;
margin-bottom:15px;
border-radius:5px;
`;