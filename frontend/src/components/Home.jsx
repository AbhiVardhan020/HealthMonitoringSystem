import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* HERO SECTION */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Personal Health Monitoring
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Track your daily health, symptoms, mood, sleep, and stress.
            Discover patterns, improve well-being, and gain insights through
            intelligent analysis.
          </p>

          <div className="flex justify-center gap-4">
            <Link
              to="/journal"
              className="bg-gray-900 text-white px-8 py-3 rounded-lg text-lg hover:bg-gray-700 transition"
            >
              Start Journaling
            </Link>

            <Link
              to="/analytics"
              className="border border-gray-900 px-8 py-3 rounded-lg text-lg hover:bg-gray-100 transition"
            >
              View Insights
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            What This App Helps You Do
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            <Feature
              icon="📝"
              title="Daily Health Journaling"
              desc="Log one journal entry per day including symptoms, sleep hours, stress levels, mood, and personal notes."
            />

            <Feature
              icon="🩺"
              title="Symptom Tracking"
              desc="Select from medically relevant, everyday symptoms categorized for easy tracking."
            />

            <Feature
              icon="😌"
              title="Mood & Stress Monitoring"
              desc="Track emotional well-being using intuitive emoji-based mood selection and stress sliders."
            />

            <Feature
              icon="📊"
              title="Health Analytics"
              desc="Visualize trends across days, weeks, and months to understand how habits affect health."
            />

            <Feature
              icon="📈"
              title="Pattern Detection"
              desc="Identify correlations between symptoms, sleep, stress, and mood using aggregated data."
            />

            <Feature
              icon="🤖"
              title="ML-Powered Insights"
              desc="Use machine learning to analyze historical data and support early health awareness."
            />

          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-10 text-center">

            <Step
              number="1"
              title="Log Daily Health"
              desc="Add a simple journal entry once per day capturing symptoms and lifestyle factors."
            />

            <Step
              number="2"
              title="Data Aggregation"
              desc="Entries are securely stored and aggregated weekly and monthly."
            />

            <Step
              number="3"
              title="Gain Insights"
              desc="View charts, trends, and patterns to better understand your health."
            />

          </div>
        </div>
      </section>

      {/* ANALYTICS PREVIEW */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Visual Health Insights
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto mb-10">
            Track how your symptoms, sleep, stress, and mood evolve over time
            with intuitive charts and reports.
          </p>

          <div className="bg-gray-100 rounded-xl p-10 text-gray-500">
            📊 Charts • Weekly Trends • Monthly Reports • Streak Tracking
          </div>
        </div>
      </section>

      {/* PRIVACY */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Your Data, Your Privacy
          </h2>
          <p className="text-gray-600">
            All health data is securely stored. You control your information,
            and your journal remains private.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Take Control of Your Health Today
          </h2>

          <Link
            to="/signup"
            className="bg-white text-gray-900 px-8 py-3 rounded-lg text-lg hover:bg-gray-200 transition"
          >
            Create Your Account
          </Link>
        </div>
      </section>

    </div>
  );
}

/* Reusable Components */

function Feature({ icon, title, desc }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}

function Step({ number, title, desc }) {
  return (
    <div>
      <div className="text-5xl font-bold text-gray-300 mb-4">{number}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}
