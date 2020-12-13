import React from 'react';
import { PickerView } from './styles';
import  {Picker}  from '@react-native-community/picker';


export default function AppPicker( {onChange, tipo} ){
    return(
        <PickerView>
            <Picker
            style={{
                width:'100%',
            }}
            selectedValue={tipo}
            onValueChange={(valor)=> onChange(valor)}
            >
                <Picker.Item label='Divida' value='debt' />
            </Picker>
        </PickerView>
    );
}