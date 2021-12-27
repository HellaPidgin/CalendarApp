// Global imports
import React, { useContext, useState } from 'react'
import { View, Text, Alert } from 'react-native'
import styled from 'styled-components/native';

// Local imports
import { AppProviderContext } from '../provider';
import { Container } from '../shared/styles'
import { Palette } from '../utils';

//Styled components
export const TouchableTimeSlot = styled.TouchableOpacity`
  border-radius: 5px;
  border-width: 1px;
  margin:10px;
  border-color: ${Palette.BlueNCS};
  justify-content: center;
  align-items: center;
  padding: 5px;
  width: 80%;
`;

const DayText = styled.Text`
  color: #fff;
  font-size: 12px;
  `

  const TitleText = styled.Text`
  color: #fff;
  font-size: 16px;
`;

export default function Day() {
  // useContext Dependencies
    const globalAppState = useContext(AppProviderContext);
    
    const handleTimePress = (time: string) => {
      // Creates a new selected time entry.
      if (globalAppState.selectedTime.length > 0){
        if(globalAppState.selectedTime === time){
          Alert.alert("This time has already been selected");
        }else{
          Alert.alert("Success!")
          globalAppState.setSelectedTime(time)
        }
      }
    }

    return (
        <Container>
          <TitleText>
            Select A Time
          </TitleText>
          {globalAppState.availableTimes.map((data) => (<TouchableTimeSlot onPress={() => handleTimePress(data.day)}>
            <DayText>
              {new Date(data.day).getHours()}:
              {new Date(data.day).getMinutes()}:
              {new Date(data.day).getSeconds()}
            </DayText>
          </TouchableTimeSlot>))}
        </Container>
    )
}
