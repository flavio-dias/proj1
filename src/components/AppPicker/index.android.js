import React from 'react';
import { PickerView } from './styles';
import  {Picker}  from '@react-native-community/picker';


export default function AppPicker( {onChange, tipo} ){
    return(
        <PickerView>
            <Picker
            style={{
                padding:0,
                width:'100%',
            }}
            selectedValue={tipo}
            onValueChange={(valor)=> onChange(valor)}
            >
                <Picker.Item label='Venda' value='debt' />
                <Picker.Item label='Receber Pagamento' value='cred' />
            </Picker>
        </PickerView>
    );
}