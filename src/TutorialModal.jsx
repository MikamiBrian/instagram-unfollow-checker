import { useState } from "react"

const steps = [
  {
    title: "Open Instagram Profile",
    text: "Open the Instagram app and go to your profile page.",
    image: "/tutorial/step1.png"
  },
  {
    title: "Open Menu",
    text: "Tap the three-line menu icon on the top right corner.",
    image: "/tutorial/step2.png"
  },
  {
    title: "Open Account Center",
    text: "From the menu, open Account Center (Meta).",
    image: "/tutorial/step3.png"
  },
  {
    title: "Go to Information & Permissions",
    text: "Select Information and permissions from the Account Center.",
    image: "/tutorial/step4.png"
  },
  {
    title: "Export Your Information",
    text: "Tap Export your information to start the export process.",
    image: "/tutorial/step5.png"
  },
  {
    title: "Select Export to Device",
    text: "Choose Export to device as the export destination.",
    image: "/tutorial/step6.png"
  },
  {
    title: "Choose Account",
    text: "Make sure the correct Instagram account is selected.",
    image: "/tutorial/step7.png"
  },
  {
    title: "Select Data Category",
    text: "Select Followers and Following as the data you want to export.",
    image: "/tutorial/step8.png"
  },
  {
    title: "Set Date Range",
    text: "Set the date range to All time.",
    image: "/tutorial/step9.png"
  },
  {
    title: "Choose Format",
    text: "Select JSON format for easier data processing.",
    image: "/tutorial/step10.png"
  },
  {
    title: "Set Media Quality",
    text: "Set media quality to medium or low to reduce file size.",
    image: "/tutorial/step11.png"
  },
  {
    title: "Start Export",
    text: "Tap Start export to request your Instagram data.",
    image: "/tutorial/step12.png"
  },
  {
    title: "Wait for Processing",
    text: "Instagram will process your request. This may take a few minutes or hours.",
    image: "/tutorial/step13.png"
  },
  {
    title: "Download ZIP File",
    text: "Once ready, download the ZIP file to your device.",
    image: "/tutorial/step14.png"
  },
  {
    title: "Upload ZIP to This Website",
    text: "Upload the downloaded ZIP file to this website to check unfollowers.",
    image: "/tutorial/step15.png"
  }
]

export default function TutorialModal({ onClose }) {
  const [step, setStep] = useState(0)
  const current = steps[step]

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal glass slide-up"
        onClick={e => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="modal-header">
          <h2>How to Export Instagram Data</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* CONTENT */}
        <div className="modal-content">
          <div className="step-count">
            Step {step + 1} / {steps.length}
          </div>

          <div className="image-box">
            <img
              src={current.image}
              alt={current.title}
              loading="lazy"
            />
          </div>

          <h3>{current.title}</h3>
          <p>{current.text}</p>
        </div>

        {/* FOOTER */}
        <div className="modal-footer">
          <button
            disabled={step === 0}
            onClick={() => setStep(step - 1)}
          >
            Prev
          </button>

          <button
            disabled={step === steps.length - 1}
            onClick={() => setStep(step + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
