import uuid from 'react-native-uuid';

class Recognition {
  static PostType = {
    RECOGNITION: 1,
    NEWS: 2,
    EVENT: 3,
  };
  static Type = {
    PROBLEM_CRACKER: 'problem-cracker',
    GROWTH_THRUSTER: 'growth-thruster',
    PASSION_FUELER: 'passion-fueler',
    BRIGHT_HANDLER: 'bright-handler',
    GREAT_VIBING: 'great-vibing',
    TEAM_INSPIRER: 'team-inspirer',
  };
  static Badges = [
    {id: uuid.v4(), type: 'problem-cracker', icon: this.Type.PROBLEM_CRACKER},
    {id: uuid.v4(), type: 'team-inspirer', icon: this.Type.TEAM_INSPIRER},
    {id: uuid.v4(), type: 'great-vibing', icon: this.Type.GREAT_VIBING},
    {id: uuid.v4(), type: 'passion-fueler', icon: this.Type.PASSION_FUELER},
    {id: uuid.v4(), type: 'bright-handler', icon: this.Type.BRIGHT_HANDLER},
    {id: uuid.v4(), type: 'growth-thruster', icon: this.Type.GROWTH_THRUSTER},
  ];
  static Steps = {
    1: {
      title: 'give-recognition',
    },
    2: {
      title: 'select-a-badge',
    },
    3: {
      title: 'leave-a-message',
    },
    4: {
      title: 'add-points',
    },
    5: {
      title: 'add-an-image',
    },
    6: {
      title: 'preview',
    },
  };
}

export default Recognition;
