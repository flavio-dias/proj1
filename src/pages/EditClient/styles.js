import styled from 'styled-components/native';

export const BG = styled.View`
flex:1;
background-color: #131313;
align-items: center;
justify-content: flex-start;
padding-top:5%;
`;
export const Header = styled.View`
width:100%;
height:50px;
padding-left:15px;
padding-right:15px;
flex-direction:row;
align-items:center;
justify-content:space-between;
margin-top:20px;
`;
export const Content = styled.View`
flex:1;
width:100%;
justify-content: flex-start;
align-items:center;
`;
export const ClientInfoArea = styled.View`
width:100%;
align-items:center;
justify-content:center;
`;
export const ValueArea = styled.View`
flex-direction:row;
`;
export const TypeChoseArea = styled.View`
width:100%;
align-items:center;
margin-bottom:10px;
`;
export const ProducListArea = styled.View`
flex:1;
width: 90%;
margin-bottom:10px;
`;
export const ProductList = styled.FlatList`
flex:1;
padding-top:5px;;
border-radius:5px;
background-color: rgba(255,255,255, 0.05);
`;
export const NewProductList = styled.FlatList`
flex:1;
padding-top:5px;;
`;
export const HeaderBtn = styled.TouchableOpacity`
align-items: center;
justify-content: center;
width: 12%;
height: 100%;
`;
export const ValueBtn = styled.TouchableOpacity`
align-items: center;
margin-left:10px;
justify-content: center;
width: 12%;
height: 40px;
border-radius:10px;
background-color:${props=>props.color === undefined? 'transparent' : props.color};
`;
export const Input = styled.TextInput`
width:90%;
height:40px;
padding-left:15px;
padding-right:15px;
background-color: rgba(255,255,255, 0.8);
border-radius: 10px;
`;
export const InputVlr = styled.TextInput`
width:61%;
height:40px;
padding-left:15px;
padding-right:15px;
margin-left:5%;
background-color: rgba(255,255,255, 0.8);
border-radius: 10px;
`;
export const PgtoArea = styled.View`
margin-top:10px;
width:100%;
height:40px;
flex-direction:row;
align-items:center;
justify-content:flex-start;
`;
export const NewSaleArea = styled.View`
margin-top:10px;
width:100%;
height:90px;
align-items:center;
justify-content:center;
`;
