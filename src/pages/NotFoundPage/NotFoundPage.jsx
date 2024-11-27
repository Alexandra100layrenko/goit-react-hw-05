import { useLocation } from 'react-router-dom';
import s from './NotFoundPage.module.css'

const NotFoundPage = () => {
  const location = useLocation();

  return (
    <div className={s.wraper}>
      <Link to={location.state?.from || '/movies'}>Go back</Link>
      <h2>Ooops.. Page is not found</h2>
    </div>
  )
}

export default NotFoundPage
