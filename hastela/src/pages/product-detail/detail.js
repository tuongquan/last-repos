import { useEffect, useState } from "react";
import { Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Apis, { endpoints } from "../../configs/Apis";
import ItemDetail from "../../layouts/ItemDetail/ItemDetail";

function Detail() {
    const [detail, setDetail] = useState([]);
    const { cate_id } = useParams();

    useEffect(() => {
        let loadDetail = async () => {
            try {
                let res = await Apis.get(endpoints['cate_detail'](cate_id));
                setDetail(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        loadDetail()
    }, [])
    return (
        <>
            <h1 className="text-center text-danger">
                CÁC SẢN PHẨM TRONG DANH MỤC
            </h1>
            {detail.length === 0 && <Spinner animation="border" variant="success" />}
            <Row>
                {detail.map(d => <ItemDetail obj={d}></ItemDetail>)}
            </Row>
            <div>{detail.description}</div>
        </>

    )
}
export default Detail;