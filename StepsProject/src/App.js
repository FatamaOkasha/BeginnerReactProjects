import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];
function App() {
  const [step, setStep] = useState(1);
  let [isOpen, setIsOpen] = useState(true);

  function handlePrevoius() {
    if (step > 1) setStep(() => step - 1);
  }
  function handleNext() {
    if (step < 3) setStep(() => step + 1);
  }
  return (
    <>
      <button className="close" onClick={() => setIsOpen(() => !isOpen)}>
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step === 1 && "active"}>1</div>
            <div className={step === 2 && "active"}>2</div>
            <div className={step === 3 && "active"}>3</div>
          </div>
          <p className="message">
            Step{step}:{messages[step - 1]}
          </p>
          <div className="buttons">
            <Button
              bgColor="#7950f2"
              textColor="#fff"
              onClick={handlePrevoius}
              text="Prevoius"
            />
            <Button
              bgColor="#7950f2"
              textColor="#fff"
              onClick={handleNext}
              text="Next"
            />
          </div>
        </div>
      )}
    </>
  );
}

function Button({ textColor, bgColor, onClick, text }) {
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {text}
    </button>
  );
}

export default App;
