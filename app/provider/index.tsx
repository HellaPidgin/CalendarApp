import React, {useState, createContext} from 'react'
import { View, Text } from 'react-native'
import { AppStateDefaults, TimesType } from './types';

const appDefaults: AppStateDefaults = {
  selectedDate: "",
  setSelectedDate: () => {},
  selectedTime: "",
  setSelectedTime: () => {},
  availableTimes: [],
  setAvailableTimes: () => {},
};
export const AppProviderContext = createContext(appDefaults);
export const AppProvider = (props: { children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal; }) => {
    const [selectedDate, setSelectedDate] = useState("0");
    const [availableTimes, setAvailableTimes] = useState<TimesType[]>([]);
    const [selectedTime, setSelectedTime] = useState("0");
    return (
        <AppProviderContext.Provider
        value={{
            selectedDate,
            availableTimes,
            setAvailableTimes,
            setSelectedDate,
            selectedTime,
            setSelectedTime,
        }}
        >
            {props.children}
        </AppProviderContext.Provider>
    )
}
