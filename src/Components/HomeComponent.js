import React from 'react';
import { Card, CardImg, CardText, CardBody,CardTitle, CardSubtitle } from 'reactstrap';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../Shared/baseUrl';
import { FadeTransform } from 'react-animation-components';

function Rendercard({item,isLoading,errmess}){
    if(isLoading){
        return (
            <Loading />
        );
    }
    else if(errmess){
        return(
            <h4>{errmess}</h4>
        );
    }
    else{
        return(
            <FadeTransform in transformProps={{
                exitTransform : 'scale(0.5) tranlasteY(-50%) '
            }}>
                <Card>
                    <CardImg src={baseUrl + item.image} alt={item.name} />
                    <CardBody>
                        <CardTitle>{item.name}</CardTitle>
                        {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null}
                        <CardText>{item.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        );
    }
}
function Home(props){
    return(
        <div className="container">
            <div className="row align-items-start">
                <div className="col-12 col-md m1">
                    <Rendercard item={props.dish}  isLoading={props.dishesLoading} errmess={props.disheserrmess}/>
                </div>
                <div className="col-12 col-md m1">
                    <Rendercard item={props.promotion} isLoading={props.promosLoading} errmess={props.promoserrmess} />
                </div>
                <div className="col-12 col-md m1">
                    <Rendercard item={props.leader}  isLoading={props.leadersLoading} errmess={props.leaderserrmess} />
                </div>
            </div>
        </div>
    );
}
export default Home