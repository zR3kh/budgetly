import logo from '../../images/logo.png';

export default function Header({currentPage}) {

  const styleBtn = (btnText) => {
    if (currentPage == btnText) {
      return {color: '#F8F6FC', padding: '10px 20px 10px 20px', borderRadius: '20px', backgroundColor: '#29419A'}
    } else {
      return {color: '#C6F1FF'}
    }
  }

  return (
    <div className="position-relative" style={{backgroundColor: '#142C8E', height: '130px'}}>
      <img className='position-absolute' src={logo} alt="logo" style={{left: 0, top: '50%', transform: 'translateY(-50%)'}}/>
      <div className='d-flex justify-content-center align-items-center h-100 color-white fw-bold'>
        <div style={styleBtn('Activité')}>Activité</div>
      </div>
    </div>
  )
}
