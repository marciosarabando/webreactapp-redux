import Header from 'components/Header';
import styles from './Home.module.scss';
import relogio from 'assets/inicial.png';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { incluirCategoria } from 'store/reducers/categorias';

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const exemploAction = () => {
    dispatch(incluirCategoria({ id: 123, nome: 'Marcio e Lucca' }));
  }

  const categorias = useSelector(state => {
    const regexp = new RegExp(state.busca, 'i')
    const categoriasaReducer = state.categorias.reduce((itens, categoria) => {
      if (categoria.nome.match(regexp))
        itens.push({
          ...categoria
        })
      return itens;
    }, [])
    return categoriasaReducer;
  });


  return (
    <div>

      <Header
        titulo='Classificados Tech'
        descricao='Compre diversos tipos de produtos no melhor site do Brasil!'
        imagem={relogio}
        className={styles.header}
      />
      <div className={styles.categorias}>
        <div className={styles['categorias-title']}>
          <h1>
            Categorias
          </h1>
        </div>

        <a onClick={exemploAction}>Aloooo</a>

        <div className={styles['categorias-container']}>
          {categorias.map((categoria, index) => (
            <div key={index} onClick={() => navigate(`/categoria/${categoria.id}`)}>
              <img src={categoria.thumbnail} alt={categoria.nome}></img>
              <h1>{categoria.nome}</h1>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}