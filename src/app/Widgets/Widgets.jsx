import './widgets.css'
import InfoIcon from '@mui/icons-material/Info'
import { FiberManualRecord } from '@mui/icons-material'

const Widgets = () => {

  const newsArticle = (heading,subtitle) => (
    <div className="widgets__article">
      <div className="widgets__articleLeft">
        <FiberManualRecord />
      </div>

      <div className="widgets__articleRight">
        <h4>{heading}</h4>
        <p>{subtitle}</p>
      </div>
    </div>
  )

  return (
    <div className='widgets'>
      <div className="widgets__header">
        <h2>LinkedIn News</h2>
        <InfoIcon />
      </div>
      {newsArticle('Abdellah is here','TOP NEWS')}
      {newsArticle('Abdellah is here','TOP NEWS')}
      {newsArticle('Abdellah is here','TOP NEWS')}
      {newsArticle('Abdellah is here','TOP NEWS')}
      {newsArticle('Abdellah is here','TOP NEWS')}
      {newsArticle('Abdellah is here','TOP NEWS')}
      {newsArticle('Abdellah is here','TOP NEWS')}
    </div>
  )
}

export default Widgets