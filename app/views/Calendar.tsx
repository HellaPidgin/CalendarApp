// Global Imports
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";

// Local Imports
import { getDaysInMonth, month, Palette } from "../utils";
import { daysAvailable } from "../api/availableDates";
import { AppProviderContext } from "../provider";
import { Container } from "../shared/styles";
const windowWidth = Dimensions.get("window").width;

// Styled Components
const MonthContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const MonthText = styled.Text`
  color: #fff;
  font-size: 20px;
  margin-horizontal: 10px;
`;

const DAY_CONTAINER_HEIGHT = 50;
const DayContainer = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: ${windowWidth / 7}px;
  height: ${DAY_CONTAINER_HEIGHT}px;
`;
const DayText = styled.Text`
  color: #fff;
  font-size: 10px;
`;
const DayFlatListContainer = styled.View`
  height: ${DAY_CONTAINER_HEIGHT * 5}px;
`;

const SIGNAL_LIGHT_SIZE = 14;
const SignalLight = styled.View`
    position: absolute;
    top:0px;
    left: 0px;
    width:${SIGNAL_LIGHT_SIZE}px;
    height:${SIGNAL_LIGHT_SIZE}px;
    border-radius: ${SIGNAL_LIGHT_SIZE / 2}px;
    background-color ${Palette.CaribbeanGreen}
`;


export default function Calendar(props: {
  navigation: { navigate: (arg0: string) => void };
}) {
  // useState dependencies
  const [daysOfTheMonth, setDaysOfTheMonth] = useState<Date[] | undefined>();
  const [activeMonth, setMonth] = useState<number>(0);
  const [activeYear, setYear] = useState<number>(0);
  
  // use dependencies
  const globalAppState = useContext(AppProviderContext);

  useEffect(() => {
    const getCurrentMonth = new Date().getMonth();
    const getCurrentYear = new Date().getFullYear();
    const days = getDaysInMonth(getCurrentMonth, getCurrentYear);
    setDaysOfTheMonth(days);
    setMonth(getCurrentMonth);
    setYear(getCurrentYear);
    //console.log(days)
    return () => {};
  }, []);

  const prevMonth = () => {
    // Changes current month to previous month
    if (activeMonth != 0) {
      const days = getDaysInMonth(activeMonth - 1, activeYear);
      setDaysOfTheMonth(days);
      setMonth(activeMonth - 1);
    } else {
      const days = getDaysInMonth(11, activeYear - 1);
      setDaysOfTheMonth(days);
      setYear(activeYear - 1);
      setMonth(11);
    }
  };
  const nextMonth = () => {
    // Changes current month to next month
    if (activeMonth != 11) {
      const days = getDaysInMonth(activeMonth + 1, activeYear);
      setDaysOfTheMonth(days);
      setMonth(activeMonth + 1);
    } else {
      const days = getDaysInMonth(0, activeYear + 1);
      setDaysOfTheMonth(days);
      setYear(activeYear + 1);
      setMonth(0);
    }
  };

  const TouchableDay = (date: Date) => {
    // This component is responsibile for managing each day displayed on the Calendar.
    var availableDay = false;
    var times: { id: number; day: string }[] = [];
    for (let i = 0; i < daysAvailable.length; i++) {
      if (new Date(daysAvailable[i].day).getFullYear() > date.getFullYear()) {
        break;
      }
      if (new Date(daysAvailable[i].day).getFullYear() === date.getFullYear()) {
        if (new Date(daysAvailable[i].day).getMonth() > date.getMonth()) {
          break;
        }
        if (new Date(daysAvailable[i].day).getMonth() === date.getMonth()) {
          if (new Date(daysAvailable[i].day).getDate() > date.getDate()) {
            break;
          }
          if (new Date(daysAvailable[i].day).getDate() == date.getDate()) {
            availableDay = true;
            times.push(daysAvailable[i]);
          }
        }
      }
    }

    return (
      <DayContainer
        disabled={!availableDay}
        onPress={() => {
          globalAppState.setSelectedDate(date.toString());
          globalAppState.setAvailableTimes(times);
          props.navigation.navigate("Day");
        }}
      >
        <DayText>{date.getDate().toString()}</DayText>
        <MaterialIcons
          name="assignment-ind"
          size={SIGNAL_LIGHT_SIZE}
          color={availableDay ? "green" : "red"}
        />
      </DayContainer>
    );
  };

  return (
    <Container>
      <MonthContainer>
        <TouchableOpacity onPress={prevMonth}>
          <MaterialIcons name="arrow-back-ios" size={22} color="white" />
        </TouchableOpacity>
        <MonthText>
          {month[activeMonth]} {activeYear}
        </MonthText>
        <TouchableOpacity onPress={nextMonth}>
          <MaterialIcons name="arrow-forward-ios" size={22} color="white" />
        </TouchableOpacity>
      </MonthContainer>
      <DayFlatListContainer>
        <FlatList
          numColumns={7}
          data={daysOfTheMonth}
          renderItem={(data) => TouchableDay(data.item)}
        />
      </DayFlatListContainer>
    </Container>
  );
}
