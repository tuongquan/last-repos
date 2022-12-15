import { useEffect, useState } from "react"
import {  Row, Spinner } from "react-bootstrap";
import Apis, { endpoints } from "../../configs/Apis";
import ItemPro from "../../layouts/ItemPro/ItemPro";


const Pro = () => {
    const [products, setproducts] = useState([]);
   // const [q] = useSearchParams();// đọc tham số truy vấn cụ thể là tìm kw của products
    // const [prev, setPrev] = useState(false);
    // const [next, setNext] = useState(false);
    // const [page, setPage] = useState(1);
    // const location = useLocation()

    useEffect(() => {
        let loadProducts = async () => {
            // let query = location.search;
            // if (query === "")
            //     query = `?page=${page}`;
            // else
            //     query += `&page=${page}`;
            try {
                const res = await Apis.get(`${endpoints['products']}`);
                setproducts(res.data.results);
                // setNext(res.data.next !== null)
                // setPrev(res.data.prev !== null)
            } catch (error) {
                console.log(error);
            }
        }
        loadProducts();
    }, [])

    // const paging = (inc) => {
    //     setPage(page + inc);
    // }
    return (
        <>
            
            <h1 className="text-center text-danger">DANH MỤC SẢN PHẨM</h1>

            {products.length === 0 && <Spinner animation="border" variant="success" />}
            {/* <ButtonGroup>
                <Button variant="success" onClick={() => setNext(paging(-1))} disabled={!prev}>&lt;&lt;</Button>
                <Button variant="success" onClick={() => setPrev(paging(1))} disabled={!next}>&gt;&gt;</Button>
            </ButtonGroup> */}
            <Row>
                {products.map(p => <ItemPro obj={p}></ItemPro>)}
            </Row>
        </>
    )
}
export default Pro