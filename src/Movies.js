import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns'

function Movies() {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axios.get(`https://cinema2-gateway-broksainis-dev.apps.sandbox.x8i5.p1.openshiftapps.com`);
                setData(response);
            } catch (error) {
                console.error(error.message);
            }
        }
        fetchData();
    }, []);

    return (
        <Container>
            <h1 className="text-center">Kino Microservices</h1>
            <Row>
                {data && data.map((movie, index) => {
                    return (
                        <Col md={4}>
                            <Card className="text-center">
                                <Link to={`/${movie.ID}`}><Card.Img variant="top" src={movie.Images.EventMediumImagePortrait} /></Link>
                                {movie.Events && movie.Events.length > 0 && (
                                    <Card.Footer className="text-muted">
                                        {format(new Date(movie.Events[0].dttmShowStart), 'dd.MM.yyyy HH:mm')}
                                    </Card.Footer>)}
                                {movie.Events && movie.Events.length === 0 && <Card.Footer className="text-muted">Nav seansu</Card.Footer>}
                            </Card>
                        </Col>
                    )
                })}
            </Row>
        </Container>
    );
}

export default Movies;