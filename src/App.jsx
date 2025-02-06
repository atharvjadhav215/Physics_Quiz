import { useState } from "react";
import img1 from "./assets/img1.jpg";
import img2 from "./assets/img2.jpg";
import img3 from "./assets/img3.jpg";
import img4 from "./assets/img4.jpg";

const questions = [img1, img2, img3, img4];
const divisions = ["CS5", "ET1"];
const rollNumberRanges = {
  CS5: { start: 1, end: 92 },
  ET1: { start: 21, end: 61 },
};

const getQuestionForStudent = (division, rollNumber) => {
  const studentId = `${division}-${rollNumber}`;
  const hash = studentId
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return questions[hash % questions.length];
};

const App = () => {
  const [division, setDivision] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [question, setQuestion] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuestion(getQuestionForStudent(division, rollNumber));
    setShowPopup(true);
  };

  const rollNumbers = division
    ? Array.from(
        {
          length:
            rollNumberRanges[division].end -
            rollNumberRanges[division].start +
            1,
        },
        (_, i) => rollNumberRanges[division].start + i
      )
    : [];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-900 to-gray-900 text-white p-6">
      <div className="bg-gray-800 p-8 rounded-xl w-[450px] text-center shadow-2xl shadow-slate-400 border border-gray-700">
        <h1 className="text-3xl font-extrabold mb-6 text-slate-100">
          Dataset for Experiment 1
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-lg font-semibold">
            Select Your Division:
          </label>
          <select
            value={division}
            onChange={(e) => {
              setDivision(e.target.value);
              setRollNumber("");
            }}
            className="w-full p-3 border border-gray-500 bg-gray-700 rounded focus:ring-2 focus:ring-slate-100"
            required
          >
            <option value="">Select Batch</option>
            {divisions.map((div) => (
              <option key={div} value={div} className="bg-gray-800">
                {div}
              </option>
            ))}
          </select>

          <label className="block text-lg font-semibold">
            Enter Your Roll Number:
          </label>
          <select
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            className="w-full p-3 border border-gray-500 bg-gray-700 rounded focus:ring-2 focus:ring-slate-100"
            required
            disabled={!division}
          >
            <option value="">Select Roll Number</option>
            {rollNumbers.map((num) => (
              <option key={num} value={num} className="bg-gray-800">
                {num}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="w-full bg-slate-100 text-gray-900 font-bold py-3 rounded-lg hover:bg-slate-300 transition transform hover:scale-105 disabled:bg-gray-500 disabled:cursor-not-allowed"
            disabled={!rollNumber}
          >
            Get Your Question
          </button>
        </form>
      </div>

      {showPopup && question && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-80 backdrop-blur-md"
          onClick={() => setShowPopup(false)}
        >
          <div
            className="relative bg-gray-900 p-6 rounded-lg shadow-lg w-auto h-auto [500px] text-center border border-gray-600"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-lg hover:scale-125 transition-transform"
              onClick={() => setShowPopup(false)}
            >
              ✖
            </button>
            <h2 className="text-4xl font-bold mb-4 text-slate-400">
              Your Question
            </h2>
            <div className="relative w-full flex justify-center items-center">
              <img
                src={question}
                alt="Question"
                className="w-full  rounded-lg shadow-md select-none pointer-events-none"
                draggable="false"
                onContextMenu={(e) => e.preventDefault()}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
