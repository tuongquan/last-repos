import { useEffect, useMemo, useState } from "react"
import { Button, ButtonGroup, Row, Spinner } from "react-bootstrap";
import Apis, { endpoints } from "../configs/Apis"
import Item from "../layouts/Item/Item";
import { useNavigate, useSearchParams } from "react-router-dom";
import Slider from "../layouts/Slider/Slider";

const Home = () => {
    const [products, setproducts] = useState([]);
    const [q] = useSearchParams();// đọc tham số truy vấn cụ thể là tìm kw của products
    const [prev, setPrev] = useState(false);
    const [next, setNext] = useState(false);
    // const [page, setPage] = useState(1);
    const nav = useNavigate()

    const meMo = useMemo(() => {
        let loadProducts = async () => {
            let query = "";
            let cateId = q.get("category_id")
            if (cateId !== null)
                query += `category_id=${cateId}`

            let kw = q.get("kw");
            if (kw !== null)
                if (query === "")
                    query += `kw=${kw}`;
                else
                    query += `&kw=${kw}`;
            try {
                const res = await Apis.get(`${endpoints['products']}?${query}`);
                setproducts(res.data.results);
                setNext(res.data.next !== null);
                setPrev(res.data.previous !== null);
            } catch (error) {
                console.log(error);
            }
            loadProducts();
        }
    }, [q]);

    // useEffect(() => {
    //     let loadPaging = async () => {
    //         let query = "";
    //         if (query === "")
    //             query += nav(`?page=${page}`);
    //         else
    //             query += nav(`&page=${page}`);
    //         try {
    //             const res = await Apis.get(`${endpoints['products']}?${query}`);
    //             setNext(res.data.next !== null);
    //             setPrev(res.data.previous !== null);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     loadPaging();
    // }, [page])


    // const paging = (inc) => {
    //     setPage(page + inc);
    // }
    return (
        <>
            <Slider />
            <h1 className="text-center text-danger">HOME</h1>

            {products.length === 0 && <Spinner animation="border" variant="success" />}
            <ButtonGroup>
                {/* <Button variant="success" onClick={paging(-1)} disabled={!prev}>&lt;&lt;</Button>
                <Button variant="success" onClick={paging(1)} disabled={!next}>&gt;&gt;</Button> */}
            </ButtonGroup>
            <Row>
                {products.map(p => <Item obj={p}></Item>)}
            </Row>
        </>
    )
}
export default Home