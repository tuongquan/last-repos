import { Card } from "react-bootstrap"
import Moment from "react-moment"

const ItemDetail = (props) => {
    return (
        <>
            <div id="contain">
                <div id="info">
                    <div className="row">
                        <div className="col-12">
                            <div className="row">
                                <div className="col-12 col-md-4">
                                    <img src={props.obj.avatar} alt="anhsp" />
                                </div>
                                <div className="col-12 col-md-8">
                                    <h2>{props.obj.name}</h2>
                                    <Card.Title>Mã sản phẩm: {props.obj.id}</Card.Title>
                                    <Card.Title>Giá bán: {props.obj.price} VND</Card.Title>
                                    <Card.Title>Ngày bán:<Moment fromNow> {props.obj.created_date}</Moment></Card.Title>
                                    <Card.Title>Loại: {props.obj.type}</Card.Title>
                                    <Card.Title>Thuộc Danh Mục: {props.obj.category}</Card.Title>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <Card.Title>Thông tin mô tả: {props.obj.description}</Card.Title>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
export default ItemDetail