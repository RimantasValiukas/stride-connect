import {Button} from "react-bootstrap";

const Polls = () => {

    return(
        <div className="mb-2">
            <Button href='/poll' variant="primary" size="lg" style={{backgroundColor: '#43535f', borderColor: '#43535f',}}>
                Sukurti balsavimą
            </Button>
        </div>
    );
}
export default Polls;