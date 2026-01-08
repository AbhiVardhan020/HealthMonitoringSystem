import React, { useState } from 'react'
import symptoms from '../data/symptoms'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function Journal() {

    // Get today's date in YYYY-MM-DD format
    const todayStr = new Date().toISOString().split("T")[0];

    const [isToday, setIsToday] = useState(true);
    const [isReadOnly, setIsReadOnly] = useState(false);
    const [entered, setEntered] = useState(false)


    const userId = localStorage.getItem('userId')

    // const [startDate, setStartDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(todayStr);
    const [todaySymptoms, setTodaySymptoms] = useState({})

    const [sleep, setSleep] = useState(7);
    const [stress, setStress] = useState(3);
    const [mood, setMood] = useState(null); // { label, emoji, score }
    const [notes, setNotes] = useState("");

    const moods = [
        { label: "Very Happy", emoji: "😄", score: 5 },
        { label: "Happy", emoji: "🙂", score: 4 },
        { label: "Neutral", emoji: "😐", score: 3 },
        { label: "Sad", emoji: "😞", score: 2 },
        { label: "Stressed", emoji: "😣", score: 1 }
    ];



    const createDefaultSymptomsMap = () => {
        const map = {};

        Object.values(symptoms).forEach((symptomList) => {
            symptomList.forEach((symptom) => {
            map[symptom] = 0;
            });
        });

        return map;
    };

    const saveEntry=async ()=>{

        try{
            const res = await fetch('http://localhost:5000/api/journal/entry', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId, todaySymptoms, sleep, stress, mood, notes
                })
            })

            const data = await res.json()
            console.log(data)
        }
        catch(err){
            console.log("Something went wrong !", err.message)
        }
    }

    const fetchJournalForDate = async (dateStr) => {
        try {
            const res = await fetch(
            `http://localhost:5000/api/journal/entry?userId=${userId}&date=${dateStr}`
            );
            const data = await res.json();
            console.log(data)
            
            if (!data.exists) {
                // No entry
                setEntered(false)
                setTodaySymptoms(createDefaultSymptomsMap());
                setSleep(7);
                setStress(3);
                setMood(null);
                setNotes("");
                setIsReadOnly(!isToday); // editable only if today
                return;
            }

            // Entry exists → populate & lock
            const entry = data.entry;
            setEntered(true)
            setTodaySymptoms(entry.symptoms);
            setSleep(entry.sleep_hours);
            setStress(entry.stress_level);
            setMood(entry.mood);
            setNotes(entry.journal_text);

            setIsReadOnly(true);
        } catch (err) {
            console.error("Failed to fetch journal", err);
        }
    };


    React.useEffect(()=>{
        setTodaySymptoms(createDefaultSymptomsMap())
    }, [])


    React.useEffect(() => {
        console.log(selectedDate)
        const selectedDateStr = selectedDate;
        console.log(todayStr, selectedDateStr)
        setIsToday(selectedDateStr === todayStr);
        console.log(isToday)

        fetchJournalForDate(selectedDateStr);
    }, [selectedDate]);



    return (
        <div className="max-w-7xl mx-auto bg-white rounded-xl shadow p-8">

        <div className="mb-8">
            <label className="block mb-2 font-medium text-lg">
            Journal Date
            </label>

            {/* <DatePicker label="Basic date picker" /> */}
            {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}

            <input
                type="date"
                value={selectedDate}
                max={todayStr}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="
                border rounded-lg px-4 py-2
                text-lg
                focus:outline-none focus:ring-2 focus:ring-gray-300
                "
            />

            {isReadOnly && (
                <p className="text-sm text-red-500 mt-2">
                    Journal entries can only be edited on the same day.
                </p>
            )}

            {isReadOnly && !isToday && !entered && (
                <p className="text-sm text-red-500 mt-2">
                    You did not make any entry on {selectedDate}.
                </p>
            )} 

            <p className="text-sm text-gray-500 mt-1">
            You can only add journal entries for today
            </p>
        </div>

        {/* Symptoms */}
        <div className="mb-8">
            <label className="block mb-4 font-medium text-lg">
                Symptoms
            </label>

            <div className="space-y-8">

                {Object.entries(symptoms).map(([sectionName, symptomList]) => (
                <div key={sectionName}>

                    {/* Section Title */}
                    <h3 className="text-md font-semibold text-gray-800 mb-3">
                    {sectionName}
                    </h3>

                    {/* Symptoms Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {symptomList.map((symptom) => (
                        <label
                        key={symptom}
                        className="
                            flex items-center space-x-2
                            p-2 rounded-md
                            hover:bg-gray-100 cursor-pointer
                        "
                        >
                        <input
                            type="checkbox"
                            disabled={isReadOnly}
                            className="accent-gray-900"
                            checked={todaySymptoms[symptom] === 1}
                            onChange={(e) =>
                            setTodaySymptoms((prev) => ({
                                ...prev,
                                [symptom]: e.target.checked ? 1 : 0
                            }))
                            }
                        />
                        <span className="text-lg">{symptom}</span>
                        </label>
                    ))}
                    </div>

                </div>
                ))}

            </div>
        </div>

        {/* Sleep Hours */}
        <div className="mb-6">
            <label className="block mb-2 font-medium">
                Hours of Sleep: <span className="font-semibold">{sleep} hrs</span>
            </label>
            <input
                type="range"
                min="0"
                max="12"
                step="0.5"
                value={sleep}
                disabled={isReadOnly}
                onChange={(e) => setSleep(Number(e.target.value))}
                className="w-full"
            />
        </div>

        {/* Stress Level */}
        <div className="mb-6">
            <label className="block mb-2 font-medium">
                Stress Level: <span className="font-semibold">{stress}/5</span>
            </label>
            <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={stress}
                disabled={isReadOnly}
                onChange={(e) => setStress(Number(e.target.value))}
                className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>Low</span>
                <span>High</span>
            </div>
        </div>

            {/* Mood Selector */}
        <div className="mb-6">
            <label className="block mb-2 font-medium">Mood of the Day</label>
            <div className="flex space-x-4">
                {moods.map((m) => (
                <button
                    key={m.label}
                    type="button"
                    disabled={isReadOnly}
                    onClick={() => setMood(m)}
                    className={`
                    text-3xl p-2 rounded-full
                    ${mood?.label === m.label ? "bg-gray-200" : "hover:bg-gray-100"}
                    `}
                >
                    {m.emoji}
                </button>
                ))}
            </div>

            {mood && (
                <p className="mt-2 text-sm text-gray-600">
                Selected: {mood.label}
                </p>
            )}
        </div>

            {/* Journal Notes */}
        <div className="mb-6">
            <label className="block mb-2 font-medium">
                Journal Entry
            </label>
            <textarea
                className="border rounded-lg px-4 py-2 w-full h-32"
                placeholder="How was your day? What affected your health?"
                value={notes}
                disabled={isReadOnly}
                onChange={(e) => setNotes(e.target.value)}
            />
        </div>

        {/* Submit */}
        <button 
            className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition"
            onClick={()=>saveEntry()}
            disabled={isReadOnly}
        >
            Save Today's Entry
        </button>

        </div>
    )
}
