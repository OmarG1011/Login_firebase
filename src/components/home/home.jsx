import { Link, useNavigate } from "react-router-dom"
import { auth } from "../../firebase"
import styles from "./home.module.css"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../../firebase"
import { useEffect, useState } from "react"

export function Home(props) {
    function salir() {
        return auth.signOut()
        navigate("/home");
    }
    const [inventario, setInventario] = useState([])
    useEffect(() => {
        const productosRef = collection(db, "Inventario");

        getDocs(productosRef)
            .then((resp) => {

                setInventario(
                        resp.docs.map((doc) => {
                            return { ...doc.data(), id: doc.id }
                        })
                    )
            })
    }, [])
    return (
        <div className={styles.container}>
             <div className={styles.header}>
                <h2 className={styles.welcomeMessage}>
                    {props.name ? `Bienvenido - ${props.name}` : "Inicie Sesión"}
                </h2>
                <Link to="/">
                    <button className={styles.button} onClick={salir}>Salir</button>
                </Link>
            </div>
            <div className={styles.table_container}>
                <h2>Inventario</h2>
                <table border="1">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Categoría</th>
                            <th>Precio Compra</th>
                            <th>Precio Venta</th>
                            <th>Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventario.map((producto) => (
                            <tr key={producto.id}>
                                <td>{producto.Nombre}</td>
                                <td>{producto.Categoría}</td>
                                <td>${producto.Precio_Compra.toFixed(2)}</td>
                                <td>${producto.Precio_Venta.toFixed(2)}</td>
                                <td>{producto.Stock}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
