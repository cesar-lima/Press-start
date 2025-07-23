import './styles/style.css'
import logo from './assets/logo.png'
import { ResponseContent } from './components/ResponseContent'

export function App() {
  return (
    <>
      <header>
        <img src={logo} alt="logo" />
      </header>

      <main>
        <section>
          <div>
            <h2>Assistente de Meta</h2>
            <p>Pergunte sobre estratégias e build para seus jogos!</p>

            <form id="form">
              <select id="gameSelector">
                <option value="">Selecione um jogo</option>
                <option value="lol">League of Legends</option>
                <option value="valorant">Valorant</option>
                <option value="dota2">Dota 2</option>
                <option value="csgo">CS:GO</option>
              </select>

              <input id="questionInput" type="text" placeholder="Ex. melhor build para ADC ..." />

              <button id="askButton">
                Perguntar
              </button>
            </form>

            <div id="response" className="hidden">
              <ResponseContent />
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default App
