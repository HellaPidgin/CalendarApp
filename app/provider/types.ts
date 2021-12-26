export interface AppStateDefaults {
  selectedDate: string;
  selectedTime: string;
  availableTimes: TimesType[];
  setSelectedDate: (value: string) => void;
  setAvailableTimes: (value: any) => void;
  setSelectedTime: (value: string) => void;
}

export interface TimesType {
  id: string;
  day: string;
}
