const CalendarSchema = [
  {
    column: "title",
    type: String,
    value: (calendar) => calendar.title,
  },
  {
    column: "start",
    type: Date,
    format: "mm/dd/yyyy",
    value: (calendar) => calendar.start,
  },
  {
    column: "end",
    type: Date,
    format: "mm/dd/yyyy",
    value: (calendar) => calendar.end,
  },
  {
    column: "phone",
    type: String,
    value: (calendar) => calendar.phone,
  },
  {
    column: "message",
    type: String,
    value: (calendar) => calendar.message,
  },
];
