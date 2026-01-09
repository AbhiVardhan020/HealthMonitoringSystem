import React from "react";
import axios from 'axios'
import JournalHeatmap from "./Heatmap";

export default function Profile() {

	const userId = localStorage.getItem('userId')
	
	const [loading, setLoading] = React.useState(true)
	const [user, setUser] = React.useState({})
	const [healthSummary, setHealthSummary] = React.useState({})
	const [heatmap, setHeapmap] = React.useState({})

	

	const getProfile = async ()=>{
		try{
            const res = await fetch(`http://localhost:5000/api/profile/?userId=${userId}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            })

            const data = await res.json()
			setUser(data)
			setHealthSummary(data.health_summary)
			setHeapmap(data.heatmap.map(d => ({
				day: d.date,
				value: d.value
			})));

            console.log(data)
        }
        catch(err){
			console.log("Something went wrong !", err.message)
        }finally{
			setLoading(false)
		}
	}

	React.useEffect(()=>{
		getProfile()
	}, [])

	if(loading){
		return <div>Loading....</div>
	}

	return (
		<div className="max-w-7xl mx-auto space-y-8">

			{/* HEADER */}
			<div className="bg-white rounded-xl shadow p-6 flex items-center justify-between">
				<div>
				<h1 className="text-3xl font-bold">{user.name}</h1>
				<p className="text-gray-600">
					Age {user.age} • Member since {user.created_at}
				</p>
				</div>

				<div className="text-5xl">👤</div>
			</div>

			{/* STATS */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<StatCard title="Current Streak" value={`${user.streak} days`} />
				<StatCard title="Longest Streak" value={`${user.max_streak} days`} />
				<StatCard title="Total Journaled Days" value={user.total_journal_days} />
			</div>

			{/* HEALTH SUMMARY */}
			<div className="bg-white rounded-xl shadow p-6">
				<h2 className="text-xl font-semibold mb-4">Health Summary</h2>

				<div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
				<SummaryItem label="Avg Sleep" value={`${healthSummary.avg_sleep} hrs`} />
				<SummaryItem label="Avg Stress" value={`${healthSummary.avg_stress}/5`} />
				<SummaryItem label="Common Mood" value={healthSummary.common_mood} />
				<SummaryItem label="Top Symptoms" value={healthSummary.top_symptoms.join(", ")} />
				</div>
			</div>

			{/* STREAK HEATMAP */}
			<JournalHeatmap data={heatmap} />
			{/* <div className="bg-white rounded-xl shadow p-6">
				<h2 className="text-xl font-semibold mb-4">
				Journaling Consistency
				</h2>

				<div className="flex gap-2 flex-wrap">
				{heatmap.map((day, index) => (
					<div
					key={index}
					className={`w-6 h-6 rounded ${
						day.value === 1 ? "bg-green-500" : "bg-gray-200"
					}`}
					title={day.value === 1 ? "Journaled" : "Missed"}
					/>
				))}
				</div>

				<p className="text-sm text-gray-500 mt-2">
				Last 14 days
				</p>
			</div> */}

			{/* ACHIEVEMENTS */}
			<div className="bg-white rounded-xl shadow p-6">
				<h2 className="text-xl font-semibold mb-4">
				Achievements
				</h2>

				<div className="flex gap-4 flex-wrap">
				<Badge label="7-Day Streak" emoji="🔥" />
				<Badge label="30 Entries" emoji="🏅" />
				<Badge label="Consistency Star" emoji="⭐" />
				</div>
			</div>

		</div>
	);
}

/* ---------- Reusable Components ---------- */

function StatCard({ title, value }) {
	return (
		<div className="bg-white rounded-xl shadow p-6 text-center">
		<p className="text-gray-500">{title}</p>
		<p className="text-3xl font-bold mt-2">{value}</p>
		</div>
	);
}

function SummaryItem({ label, value }) {
	return (
		<div>
		<p className="text-gray-500 text-sm">{label}</p>
		<p className="text-lg font-semibold mt-1">{value}</p>
		</div>
	);
}

function Badge({ label, emoji }) {
	return (
		<div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
		<span className="text-xl">{emoji}</span>
		<span className="font-medium">{label}</span>
		</div>
	);
}
