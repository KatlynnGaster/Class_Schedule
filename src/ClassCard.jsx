import Card from 'react-bootstrap/Card';


const ItemTypes = {
  CLASS: "class",
};

function ClassCard({classId, className, classDescrpt, classCap, classCode, classType, classSec, classTerm}) {

    return (
        <>
          <Card
            // ref={drag}
            bg="primary" // Choose a single color (e.g., 'primary')
            key={classId}
            text="white" // Text color is 'white' because 'primary' is dark
            // style={{ width: '18rem', opacity: isDragging ? 0.5 : 1, cursor: "grab" }}
            style={{ width: '14rem'}}
            className="mb-2"
          >
            <Card.Header> {/*CSCI 3155*/} {className} </Card.Header>
            <Card.Body>
              <Card.Subtitle>
                {/* Principles of Programming Languages */}
                {classCode}
                <br />
                {classDescrpt}
                </Card.Subtitle>
              <Card.Text>
                {/* TTh 9:30 - 10:45
                <br />
                Kathy */}
                Capacity: {classCap}
                <br />
                Type: {classType}
                <br />
                Section: {classSec}
                <br />
                Term: {classTerm}

              </Card.Text>
            </Card.Body>
          </Card>
        </>
      );
    }      

export default ClassCard;