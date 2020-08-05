import React from 'react'

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

import './styles.css'

function TeacherItem(){
  return(
    <article className="teacher-item">
    <header>
      <img src="https://avatars3.githubusercontent.com/u/59286021?s=460&u=acc6d10e64940122bd2c3c64c52dcae0098d03bf&v=4" alt="Alvaroico"/>
      <div>
        <strong>Álvaro Ribeiro Pereira</strong>
        <span>Química</span>
      </div>
    </header>

    <p>
    orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
    <br/><br/>
    It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially 
    </p>

    <footer>
      <p>
        Preço/Hora
        <strong>R$ 80,00</strong>
      </p>
      <button type="button">
        <img src={whatsappIcon} alt="Whatsapp"/>
        Entrar em contato
      </button>
    </footer>
  </article>
  )
}

export default TeacherItem;