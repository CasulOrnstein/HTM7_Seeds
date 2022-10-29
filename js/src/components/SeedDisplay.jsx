import './components.css'

export const SeedDisplay = ({ data }) => {
  return (
    <div className="seed-display">
      <img src={data.flowerImageUrl} className="main-image"/>
      <img src={data.seedImageUrl} className="seed-image"/>
    </div>
  )
};