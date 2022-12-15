import { useEffect, useState } from "react";
import { Col, Image, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Apis, { endpoints } from "../../configs/Apis";
import ItemDetail from "../../layouts/ItemDetail/ItemDetail";



const ProductDetail = () => {
    const [comments, setComments] = useState([]);
    const [detailPro, setDetailPro] = useState([]);
    const { product_id } = useParams();

    useEffect(() => {
        let loadProductDetail = async () => {
            try {
                let res = await Apis.get(endpoints['products_detail'](product_id));

                setDetailPro(res.data);

            } catch (error) {
                console.log(error);
            }
        }
        let loadComment = async () => {

        }
        loadComment();
        loadProductDetail();
    }, [product_id]);
    return (
        <>
            <h1 className="text-center text-danger">
                CHI TIẾT SẢN PHẨM
            </h1>
            {detailPro.length === 0 && <Spinner animation="border" variant="success" />}
            <Row>
                <ItemDetail obj={detailPro}></ItemDetail>
            </Row>
            <hr />
            {comments.map(c => <Row>
                                    <Col md={1} xs={3}>
                                        <Image src={c.images} roundedCircle fluid />
                                        <p></p>
                                    </Col>
                                    <Col md={11} xs={9}>
                                        <p></p>
                                        <p></p>
                                    </Col>
                             </Row>)}

        </>
    )
}
export default ProductDetail;