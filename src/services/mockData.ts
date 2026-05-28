export interface User {
  id: string;
  organization: string;
  username: string;
  email: string;
  phone: string;
  dateJoined: string;
  status: 'active' | 'inactive' | 'pending' | 'blacklisted';
  tier: number;
  accountBalance: string;
  bankAccount: string;
  bankName: string;
  bvn: string;
  gender: string;
  maritalStatus: string;
  children: string;
  typeOfResidence: string;
  educationLevel: string;
  employmentStatus: string;
  monthlyIncome: string;
  loanRepayment: string;
  twitter: string;
  facebook: string;
  instagram: string;
  guarantorName: string;
  guarantorPhone: string;
  guarantorEmail: string;
  guarantorRelationship: string;
}

const organizations = [
  'Irorun', 'Lendstar', 'Quickcash', 'Fastloan',
  'Monipoint', 'Kuda', 'Opay', 'Palmpay',
  'Fairmoney', 'Renmoney'
];

const firstNames = [
  'Grace', 'John', 'Mary', 'James', 'Patricia',
  'Michael', 'Jennifer', 'David', 'Linda', 'Robert',
  'Barbara', 'William', 'Elizabeth', 'Richard', 'Susan',
  'Joseph', 'Jessica', 'Thomas', 'Sarah', 'Charles'
];

const lastNames = [
  'Effiom', 'Smith', 'Johnson', 'Williams', 'Brown',
  'Jones', 'Garcia', 'Miller', 'Davis', 'Wilson',
  'Adeyemi', 'Okafor', 'Ibrahim', 'Nwosu', 'Adeleke',
  'Okonkwo', 'Babatunde', 'Chukwu', 'Abubakar', 'Musa'
];

const banks = [
  'Access Bank', 'GTBank', 'First Bank',
  'UBA', 'Zenith Bank', 'Kuda Bank'
];

const statuses: User['status'][] = [
  'active', 'inactive', 'pending', 'blacklisted'
];

const randomItem = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

const randomNumber = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const randomDate = (): string => {
  const start = new Date(2019, 0, 1);
  const end = new Date(2022, 11, 31);
  const date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  return date.toLocaleDateString('en-US', {
    month: 'short', day: 'numeric',
    year: 'numeric', hour: '2-digit', minute: '2-digit'
  });
};

export const generateUsers = (count: number): User[] => {
  return Array.from({ length: count }, (_, i) => {
    const firstName = randomItem(firstNames);
    const lastName = randomItem(lastNames);
    const org = randomItem(organizations);
    return {
      id: `user-${i + 1}`,
      organization: org,
      username: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@gmail.com`,
      phone: `080${randomNumber(10000000, 99999999)}`,
      dateJoined: randomDate(),
      status: randomItem(statuses),
      tier: randomNumber(1, 3),
      accountBalance: `$${randomNumber(1000, 999999).toLocaleString()}.00`,
      bankAccount: `${randomNumber(1000000000, 9999999999)}`,
      bankName: randomItem(banks),
      bvn: `${randomNumber(10000000000, 99999999999)}`,
      gender: randomItem(['Male', 'Female']),
      maritalStatus: randomItem(['Single', 'Married']),
      children: randomItem(['None', '1', '2', '3']),
      typeOfResidence: randomItem(['Parent\'s Apartment', 'Own Apartment', 'Rented']),
      educationLevel: randomItem(['B.Sc', 'M.Sc', 'OND', 'HND']),
      employmentStatus: randomItem(['Employed', 'Self-employed']),
      monthlyIncome: `$${randomNumber(20000, 500000).toLocaleString()}`,
      loanRepayment: `$${randomNumber(5000, 100000).toLocaleString()}`,
      twitter: `@${firstName.toLowerCase()}`,
      facebook: `${firstName} ${lastName}`,
      instagram: `@${firstName.toLowerCase()}${i}`,
      guarantorName: `${randomItem(firstNames)} ${randomItem(lastNames)}`,
      guarantorPhone: `070${randomNumber(10000000, 99999999)}`,
      guarantorEmail: `guarantor${i}@gmail.com`,
      guarantorRelationship: randomItem(['Spouse', 'Parent', 'Sibling', 'Friend']),
    };
  });
};

export const USERS = generateUsers(500);