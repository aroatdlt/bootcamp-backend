
interface User {
  name: string;
  age: number;
}

interface Student extends User {
  occupation: string;
}

interface Teacher  extends User{
  subject: string;
}


const users: (Teacher|Student) [] = [
  {
    name: "Luke Patterson",
    age: 32,
    occupation: "Internal auditor",
  },
  {
    name: "Jane Doe",
    age: 41,
    subject: "English",
  },
  {
    name: "Alexandra Morton",
    age: 35,
    occupation: "Conservation worker",
  },
  {
    name: "Bruce Willis",
    age: 39,
    subject: "Biology",
  },
];

const isTeacher = (user: Teacher | Student): user is Teacher => {
  return (user as Teacher).subject !== undefined;
}

const isStudent = (user: Teacher | Student): user is Student => {
  return (user as Student).occupation !== undefined;
}

const logUser = (user: (Teacher | Student)) => {
  let extraInfo: string;
  if (isTeacher(user)) {
    extraInfo = user.subject;
  } else {
    extraInfo = user.occupation;
  }
  console.log(`  - ${user.name}, ${user.age}, ${extraInfo}`);
};


users.forEach(logUser);