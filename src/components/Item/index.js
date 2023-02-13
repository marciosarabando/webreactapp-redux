import styles from './Item.module.scss';
import {
  AiOutlineHeart,
  AiFillHeart,
  AiFillMinusCircle,
  AiFillPlusCircle
} from 'react-icons/ai'
import { FaCartPlus } from 'react-icons/fa';
import { mudarFavorito } from 'store/reducers/itens';
import { useDispatch, useSelector } from 'react-redux';
import { mudarCarrinho, mudarQuantidade } from 'store/reducers/carrinho';
import classNames from 'classnames';

const iconeProps = {
  size: 24,
  color: '#041833'
}

const quantidadeProps = {
  size: 32,
  color: '#1875E8'
}

export default function Item(props) {
  const {
    titulo,
    foto,
    preco,
    descricao,
    favorito,
    id,
    carrinho,
    quantidade
  } = props;

  const dispatch = useDispatch();

  const resolverFavorito = () => {
    dispatch(mudarFavorito(id));
  }

  const resolverCarrinho = () => {
    dispatch(mudarCarrinho(id))
  }

  const estaNoCarrinho = useSelector(state => state.carrinho.some(itemNoCarrinho => itemNoCarrinho.id === id))

  return (
    <div className={classNames(styles.item, {
      [styles.itemNoCarrinho]: carrinho
    })}>
      <div className={styles['item-image']}>
        <img src={foto} alt={titulo}></img>
      </div>
      <div className={styles['item-descricao']}>
        <div className={styles['item-titulo']}>
          <h2>{titulo}</h2>
          <p>{descricao}</p>
        </div>
        <div className={styles['item-info']}>
          <div className={styles['item-preco']}>
            R$ {preco.toFixed(2)}
          </div>
          <div className={styles['item-acoes']}>
            {favorito ? <AiFillHeart {...iconeProps} color='#FF0000' className={styles['item-acao']} onClick={resolverFavorito} />
              : <AiOutlineHeart {...iconeProps} onClick={resolverFavorito} />}

            {carrinho ?
              (<div className={styles.quantidade}>
                Quantidade: <AiFillMinusCircle {...quantidadeProps} onClick={() => {
                  if (quantidade >= 1)
                    dispatch(mudarQuantidade({ id: id, quantidade: -1 }))
                }
                } />
                <span>{String(quantidade || 0).padStart(2, '0')}</span>
                <AiFillPlusCircle {...quantidadeProps} onClick={() => dispatch(mudarQuantidade({ id: id, quantidade: +1 }))} />
              </div>)
              : (<FaCartPlus className={styles['item-acao']} {...iconeProps}
                color={estaNoCarrinho ? '#1875E8' : iconeProps.color} onClick={resolverCarrinho} />)
            }
          </div>
        </div>
      </div>
    </div>
  )
}