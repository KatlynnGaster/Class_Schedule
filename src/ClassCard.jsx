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
  scheduleData // ✅ Add scheduleData as a prop
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
    classTerm
  });

  const handleUpdate = (updatedData) => {
    setClassInfo(updatedData);
    setIsEditing(false); // auto-close editor on save
  };

  // Format the class time from scheduleData
  let classTime = "Unassigned";

  if (
    scheduleData?.data?.start?.hour !== undefined &&
    scheduleData?.data?.start?.minute !== undefined &&
    scheduleData?.data?.end?.hour !== undefined &&
    scheduleData?.data?.end?.minute !== undefined
  ) {
    classTime = `${scheduleData.data.start.hour}:${String(scheduleData.data.start.minute).padStart(2, "0")} - ${scheduleData.data.end.hour}:${String(scheduleData.data.end.minute).padStart(2, "0")}`;
  }

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
            Term: {classInfo.classTerm}
            <br />
            Capacity: {classInfo.classCap}
            <br />
            Section: {classInfo.classSec}
            <br />
            Time: {classTime} {/* Display formatted class time */}
            <br />
            Type: {classInfo.classType}
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
