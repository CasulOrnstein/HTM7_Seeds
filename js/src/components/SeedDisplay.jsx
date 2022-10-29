export const SeedDisplay = ({ data }) => {
  return (
    <div style={{ height: '100px', width: '100px', background: 'red', position: "relative" }}>
      <img src={data.flowerImageUrl} style={{ width: '100%' }}/>
      <img src={data.seedImageUrl} style={{ position: "absolute", width: "25%", right: 0, bottom: 0 }}/>
      <p style={{ position: "absolute", color: "wheat", bottom: 0, margin: 0 }}>{data.name}</p>
    </div>
  )
};