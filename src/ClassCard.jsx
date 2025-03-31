import Card from 'react-bootstrap/Card';

function ClassCard() {
    return (
        <>
          <Card
            bg="primary" // Choose a single color (e.g., 'primary')
            key="Primary"
            text="white" // Text color is 'white' because 'primary' is dark
            style={{ width: '18rem' }}
            className="mb-2"
          >
            <Card.Header>CSCI 3155</Card.Header>
            <Card.Body>
              <Card.Subtitle>
                Principles of Programming Languages
                </Card.Subtitle>
              <Card.Text>

                TTh 9:30 - 10:45
                <br />
                Kathy
              </Card.Text>
            </Card.Body>
          </Card>
        </>
      );
    }      

export default ClassCard;