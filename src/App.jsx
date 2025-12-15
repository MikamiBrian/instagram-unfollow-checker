import { useState } from "react"
import { parseInstagramZip } from "./utils/parseZip"
import "./index.css"

export default function App() {
  const [status, setStatus] = useState("")
  const [loading, setLoading] = useState(false)

  const [followers, setFollowers] = useState([])
  const [following, setFollowing] = useState([])
  const [notBack, setNotBack] = useState([])

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
        <h1>Instagram Unfollow Checker</h1>
        <p className="subtitle">
          100% local • No login • No data upload
        </p>

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

        {(followers.length > 0 || following.length > 0) && (
          <div className="layout">
            <div className="grid">
              <ResultBox title="Following" data={following} />
              <ResultBox title="Followers" data={followers} />
              <ResultBox
                title="Not Following Back"
                data={notBack}
                danger
              />
            </div>

            <aside className="side">
              <h3>Credit</h3>

              <p className="credit-text">
                Instagram Unfollow Checker built with
                <span className="react-badge"> React</span>.
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
        )}
      </div>
    </div>
  )
}

function ResultBox({ title, data, danger }) {
  return (
    <div className={`box ${danger ? "danger" : ""}`}>
      <h3>
        {title} ({data.length})
      </h3>
      <div className="list">
        {data.map(u => (
          <div key={u} className="user">
            @{u}
          </div>
        ))}
      </div>
    </div>
  )
}
