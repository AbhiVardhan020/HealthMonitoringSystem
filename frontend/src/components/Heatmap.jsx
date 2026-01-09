import { ResponsiveCalendar } from "@nivo/calendar";

export default function JournalHeatmap({ data }) {
  const today = new Date();
  const from = new Date();
  from.setFullYear(today.getFullYear() - 1);

  return (
    <div style={{ height: 220 }}>
      <ResponsiveCalendar
        data={data}
        from={from}
        to={today}
        emptyColor="#eeeeee"
        colors={["#c6e48b", "#7bc96f", "#239a3b", "#196127"]}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        yearSpacing={40}
        monthBorderColor="#ffffff"
        dayBorderWidth={1}
        dayBorderColor="#ffffff"
        tooltip={({ day, value }) => (
          <div
            style={{
              background: "white",
              padding: "6px 10px",
              borderRadius: "6px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              fontSize: "12px"
            }}
          >
            <strong>{day}</strong>
            <br />
            {value
              ? `${value} journal entry`
              : "No entry"}
          </div>
        )}
      />
    </div>
  );
}
