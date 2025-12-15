import JSZip from "jszip"

function extractFollowers(arr) {
  if (!Array.isArray(arr)) return []
  return arr
    .map(i => i?.string_list_data?.[0]?.value)
    .filter(Boolean)
}

function extractFollowing(arr) {
  if (!Array.isArray(arr)) return []
  return arr
    .map(i => i?.title)
    .filter(Boolean)
}

export async function parseInstagramZip(file) {
  const zip = await JSZip.loadAsync(file)

  const followersFile = zip.file(
    "connections/followers_and_following/followers_1.json"
  )

  const followingFile = zip.file(
    "connections/followers_and_following/following.json"
  )

  if (!followersFile || !followingFile) {
    throw new Error("Instagram followers/following file not found")
  }

  const followersJson = JSON.parse(await followersFile.async("string"))
  const followingJson = JSON.parse(await followingFile.async("string"))

  const followers = extractFollowers(followersJson)
  const following = extractFollowing(
    followingJson.relationships_following
  )

  return { followers, following }
}
