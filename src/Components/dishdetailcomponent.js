import React,{ Component} from 'react';
import { Card,CardImg,CardText,CardBody,CardTitle,BreadcrumbItem,Breadcrumb, Button,ModalBody,Modal,ModalHeader, Label, Col,Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control,LocalForm,Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import {baseUrl} from '../Shared/baseUrl';
import { FadeTransform,Fade,Stagger } from 'react-animation-components';



function Rendercomment({dish1,postComment,dishId}){
    const commentlist=dish1.map(x =>{
        return(
            <Fade in>
                <li key={x.id}>
                    {x.comment}
                    <br/><br/>
                    {x.author},{new Intl.DateTimeFormat('en-us',{year:'numeric',month : 'short' ,day:'2-digit'}).format(new Date(Date.parse(x.date)))}
                    <br/><br/>
                </li>
            </Fade>
        )
    })
    if(dish1!=null){
        return(
            <div>
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    <Stagger in>
                        {commentlist}
                    </Stagger>
                  <div>  <CommentForm dishId={dishId} postComment={postComment} /> </div>
                </ul>
            </div>
        )
    }
    else{
        return(
            <div></div>
        );
    }
}
function Renderdish({dish1}){
    if(dish1!=null){
        return(
            // <div className="col-12 col-md-5 m-1">
                <FadeTransform in transformProps={{
                    exitTransform : 'scale(0.5) tranlasteY(-50%) '
                }}>
                    <Card>
                        <CardImg  width="100%" src={baseUrl + dish1.image} alt={dish1.name} />
                        <CardBody>
                            <CardTitle>{dish1.name}</CardTitle>
                            <CardText>{dish1.description}</CardText>
                        </CardBody>     
                    </Card>
                </FadeTransform>
            // </div>
        );
    }
    else{
        return(
            <div></div>
        );
    }
}

const Dishdetail = (props) => {
    if(props.isLoading){
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if(props.errmess){
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.errmess}</h4>
                </div>
            </div>
        );
    }
    else if(props.dish!=null){
        const dish1=props.dish;
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>   
                <div className="row">
                    <div key={dish1.id} className="col-12 col-md-5 m-1">
                        {/* {this.renderdish(dish1)} */}
                        <Renderdish dish1={props.dish} />
                    </div>
                    <div key={dish1.id} className="col-12 col-md-5 m-1">
                        {/* {this.rendercomment(dish1)} */}
                        <Rendercomment dish1={props.comments} postComment={props.postComment} dishId={props.dish.id} />
                    </div>
                </div>
            </div>
        );
    }
    else{
        return(
            <div></div>
        );
    }
}
export default Dishdetail;

const required = (val) => val && val.length;
const maxLength = (len) => (val) =>!(val) || ((val.length)<=len);
const minLength = (len) => (val) => (val) && (val.length>=len);

class CommentForm extends Component{
    constructor(props){
        super(props);
        this.state={
            isModalOpen : false
        }
        this.handleSubmit=this.handleSubmit.bind(this);
        this.toggleModal=this.toggleModal.bind(this);
    }

    toggleModal(event){
        this.setState({
            isModalOpen : !this.state.isModalOpen
        });
    }
    handleSubmit(values){
        this.toggleModal();
        // console.log("Current state is : " + JSON.stringify(values));
        // alert("Current state is : " + JSON.stringify(values));
        this.props.postComment(this.props.dishId,values.rating,values.author,values.comment);
    }

    render(){
        return(
            <div>
                <Button outline color="secondary" onClick={this.toggleModal}>
                    <span className="fa fa-pencil">Add Comment</span>
                </Button>
                <div className="row row-content">
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}> Submit Comment</ModalHeader>
                        <ModalBody>
                            <div className="col-12 col-md-9">
                                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                    <Row className="form-group">
                                        <Label htmlFor="rating" md={3}>Rating</Label>
                                        <Col md={9}>
                                            <Control.select model=".rating" name="rating" className="form-control">
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </Control.select>
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="author" md={3}>Name</Label>
                                        <Col md={9}>
                                            <Control.text model=".author" name="author" id="author" className="form-control"  validators={{
                                        required,minLength: minLength(3) ,maxLength :maxLength(15) }}/>
                                                <Errors className="text-danger"
                                                model=".author"
                                                show="touched"
                                                messages={{
                                                    required :'Required',
                                                    minLength :'Must be greater than 3 characters',
                                                    maxLength:'Must be smaller than 15 characters'
                                                }} />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="feedback" md={3}>Comment</Label>
                                        <Col md={9}>
                                            <Control.textarea model=".comment"  id="comment" name="comment"  rows="6" className="form-control" validators={{required}}/>
                                            <Errors className="text-danger" model=".comment" show="touched" messages={{required : 'Required'}}/>
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Col md={{size:10 ,offset:3}}>
                                            <Button type="submit" color="primary">Submit</Button>
                                        </Col>
                                    </Row>
                                </LocalForm>
                            </div>
                        </ModalBody>
                    </Modal>
                </div>
            </div>
        );
    }
}