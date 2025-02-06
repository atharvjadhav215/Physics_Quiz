import { useState } from "react";

const questions = [
  "https://plus.unsplash.com/premium_photo-1673029925648-af80569efc46?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
  "https://images.unsplash.com/photo-1738363436637-ee6f4a910715?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8",
  "https://images.unsplash.com/photo-1738326310407-38b3e0156453?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8",
  "https://plus.unsplash.com/premium_photo-1674675646896-456033a4b629?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8",
  "https://images.unsplash.com/photo-1738230077816-fbab6232c545?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8",
  "https://images.unsplash.com/photo-1738330094149-03cc30132bbb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8",
  "https://images.unsplash.com/photo-1738000711416-a22d5ad609a8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8",
  "https://images.unsplash.com/photo-1738251248377-43d3f369ee4b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1738247999456-97df5721f8cc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8",
  "https://images.unsplash.com/photo-1738273473785-99c1fc498c14?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D",
];

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

  return (
    <div className="flex justify-center items-center h-screen bg-slate-800">
      <div className="bg-white p-6 rounded-lg w-[400px] text-center shadow-2xl shadow-black">
        <h1 className="text-2xl font-bold mb-4">PHYSICS QUIZ</h1>
        <form onSubmit={handleSubmit} className="mb-4">
          <label className="block mb-2">Enter Your Batch:</label>
          <select
            value={division}
            onChange={(e) => setDivision(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-3"
            required
          >
            <option value="">Select Batch</option>
            <option value="C51">C51</option>
            <option value="C52">C52</option>
            <option value="C53">C53</option>
            <option value="C54">C54</option>
            <option value="E12">E12</option>
            <option value="E13">E13</option>
          </select>
          <label className="block mb-2">Enter Your Roll Number:</label>
          <input
            type="number"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-3"
            placeholder="Roll Number"
            required
          />
          <button
            type="submit"
            className="w-full bg-slate-700 text-white hover:border-black hover:border-1 font-bold hover:shadow-2xl hover:shadow-black py-2 rounded hover:bg-black transform transition-all ease-in-out hover:scale-105 duration-500"
          >
            See Question...
          </button>
        </form>
        {showPopup && question && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-80">
            <div className="relative bg-gray-500 p-4 rounded-lg shadow-lg  transform transition-all ease-in-out hover:scale-105 duration-1000">
              <button
                className="absolute top-2 right-2 bg-gray-200 text-white px-2 py-1 rounded-full  transform transition-all ease-in-out hover:scale-150 duration-500"
                onClick={() => setShowPopup(false)}
              >
                ✖
              </button>
              <img
                src={question}
                alt="Question"
                className="w-full h-auto rounded"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
