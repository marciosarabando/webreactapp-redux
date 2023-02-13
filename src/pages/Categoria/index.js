import Header from "components/Header"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import styles from './Categoria.module.scss'
import Item from "components/Item"

export default function Categoria() {
    const { nomecategoria } = useParams();
    const { categoria, itens } = useSelector(state => {
        const regex = new RegExp(state.busca, 'i');
        return {
            categoria: state.categorias.find(categoria => categoria.id === nomecategoria),
            itens: state.itens.filter(item => item.categoria === nomecategoria
                && item.titulo.match(regex))
        }
    }
    );

    return (
        <div>
            <Header
                titulo={categoria.nome}
                descricao={categoria.descricao}
                imagem={categoria.header}
            />
            <div className={styles.estilo}>
                {itens?.map((item) => (
                    <Item key={item.id} {...item}></Item>
                ))}
            </div>
        </div>
    )
}