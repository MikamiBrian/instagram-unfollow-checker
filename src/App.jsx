import { useState } from "react"
import { parseInstagramZip } from "./utils/parseZip"
import "./index.css"

export default function App() {
  const [status, setStatus] = useState("")
  const [loading, setLoading] = useState(false)

  const [followers, setFollowers] = useState([])
  const [following, setFollowing] = useState([])
  const [notBack, setNotBack] = useState([])

  const [showTutorial, setShowTutorial] = useState(false)

  const steps = [
    { title: "Open Profile", text: "Open your Instagram profile and Tap the three-line menu icon.", image: "/tutorial/step1.jpg" },
    { title: "Account Center", text: "Open Account Center (Meta).", image: "/tutorial/step2.png" },
    { title: "Your Info", text: "Go to Information & Permissions.", image: "/tutorial/step3.png" },
    { title: "Export Data", text: "Tap Export your information.", image: "/tutorial/step4.png" },
    { title: "Create Export.", text: "Tap Create Export.", image: "/tutorial/step5.png" },
    { title: "Export to Device", text: "Tap Export to Device.", image: "/tutorial/step6.png" },
    { title: "Customize Info", text: "Tap Customize Info.", image: "/tutorial/step7.png" },
    { title: "Connection", text: "In Connection, Choose Following and Followers.", image: "/tutorial/step8.png" },
    { title: "Date Range", text: "Choose All Time.", image: "/tutorial/step9.png" },
    { title: "Format", text: "Tap Format.", image: "/tutorial/step10.png" },
    { title: "Files Format", text: "Choose JSON.", image: "/tutorial/step11.png" },
    { title: "Recheck", text: "Make Sure All Data is Filled in According to This Image and Tap Start Export.", image: "/tutorial/step12.png" },
    { title: "Wait", text: "Wait For About 5 Minutes", image: "/tutorial/step13.png" },
    { title: "Download", text: "Download Zip File.", image: "/tutorial/step14.png" },
  ]

  async function handleFile(file) {
    if (!file) return

    setLoading(true)
    setStatus("Reading Instagram ZIP...")
    setFollowers([])
    setFollowing([])
    setNotBack([])

    try {
      const data = await parseInstagramZip(file)

      const followersSet = new Set(data.followers)
      const notFollowingBack = data.following.filter(
        u => !followersSet.has(u)
      )

      setFollowers(data.followers)
      setFollowing(data.following)
      setNotBack(notFollowingBack)

      setStatus(
        `Done • Following ${data.following.length} • Followers ${data.followers.length} • Not back ${notFollowingBack.length}`
      )
    } catch (e) {
      console.error(e)
      setStatus("Failed to read Instagram ZIP")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app-bg">
      <div className="card glass fade-in">

        {/* HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1>Instagram Unfollow Checker</h1>
            <p className="subtitle">100% local • No login • No data upload</p>
          </div>

          <button
            onClick={() => setShowTutorial(true)}
            style={{
              padding: "10px 16px",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.2)",
              background: "rgba(99,102,241,0.2)",
              color: "#c7d2fe",
              cursor: "pointer"
            }}
          >
            Tutorial
          </button>
        </div>

        {/* UPLOAD */}
        <label className="upload-box">
          <input
            type="file"
            accept=".zip"
            hidden
            onChange={e => handleFile(e.target.files[0])}
          />
          Upload Instagram ZIP
        </label>

        {loading && <div className="loader" />}
        {status && <p className="status">{status}</p>}

        <div className="layout">
          {(followers.length > 0 || following.length > 0) && (
            <div className="grid">
              <ResultBox title="Following" data={following} />
              <ResultBox title="Followers" data={followers} />
              <ResultBox title="Not Following Back" data={notBack} danger />
            </div>
          )}

          <aside className="side">
            <h3>Credit</h3>
            <p className="credit-text">
              Instagram Unfollow Checker built with
              <span className="react-badge"> React</span>
            </p>

            <a
              href="https://www.instagram.com/brnfhme"
              target="_blank"
              rel="noopener noreferrer"
              className="ig-link"
            >
              <span className="ig-icon">📷</span>
              @brnfhme
            </a>

            <p className="credit-footer">
              All processing happens locally in your browser.
            </p>
          </aside>
        </div>
      </div>

      {/* ===== TUTORIAL MODAL SCROLL ===== */}
      {showTutorial && (
        <div
          onClick={() => setShowTutorial(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(2,6,23,0.85)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            className="glass"
            style={{
              width: "92%",
              maxWidth: "640px",
              maxHeight: "85vh",
              overflowY: "auto",
              padding: "20px",
              borderRadius: "20px"
            }}
          >
            <h2 style={{ marginBottom: "12px" }}>Tutorial</h2>

            {steps.map((s, i) => (
              <div key={i} style={{ marginBottom: "28px" }}>
                <h3 style={{ marginBottom: "6px", color: "#c7d2fe" }}>
                  Step {i + 1}: {s.title}
                </h3>

                <img
                  src={s.image}
                  alt=""
                  style={{
                    width: "100%",
                    borderRadius: "12px",
                    margin: "10px 0"
                  }}
                />

                <p style={{ fontSize: "14px", color: "#cbd5f5" }}>
                  {s.text}
                </p>
              </div>
            ))}

            <button
              onClick={() => setShowTutorial(false)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "12px",
                border: "none",
                background: "#6366f1",
                color: "white",
                cursor: "pointer"
              }}
            >
              Close Tutorial
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

/* RESULT BOX */
function ResultBox({ title, data, danger }) {
  return (
    <div className={`box ${danger ? "danger" : ""}`}>
      <h3>{title} ({data.length})</h3>
      <div className="list">
        {data.map(u => (
          <div key={u} className="user">@{u}</div>
        ))}
      </div>
    </div>
  )
}
