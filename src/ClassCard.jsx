import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import EditFeature from './editFeature/editFeature.jsx';

function ClassCard({
  classId,
  className,
  classDescrpt,
  classCap,
  classCode,
  classType,
  classSec,
  classTerm,
  classTime
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [classInfo, setClassInfo] = useState({
    classId,
    className,
    classDescrpt,
    classCap,
    classCode,
    classType,
    classSec,
    classTerm,
    classTime
  });

  const handleUpdate = (updatedData) => {
    setClassInfo(updatedData);
    setIsEditing(false); // auto-close editor on save
  };

  return (
    <>
      <Card
        bg="primary"
        key={classInfo.classId}
        text="white"
        style={{ width: '14rem' }}
        className="mb-2"
      >
        <Card.Header>{classInfo.className}</Card.Header>
        <Card.Body>
          <Card.Subtitle>
            {classInfo.classCode}
            <br />
            {classInfo.classDescrpt}
          </Card.Subtitle>
          <Card.Text>
            Capacity: {classInfo.classCap}
            <br />
            Type: {classInfo.classType}
            <br />
            Section: {classInfo.classSec}
            <br />
            Term: {classInfo.classTerm}
            <br />
            Time: {classInfo.classTime}
          </Card.Text>

          <Button
            variant="light"
            size="sm"
            onClick={() => setIsEditing((prev) => !prev)}
          >
            {isEditing ? 'Close Editor' : 'Edit'}
          </Button>
        </Card.Body>
      </Card>

      {isEditing && (
        <EditFeature classData={classInfo} onUpdate={handleUpdate} />
      )}
    </>
  );
}

export default ClassCard;
