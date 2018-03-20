import { Profile  } from '../../models/profile/profile.interface';


const userList: Profile[] = [

 { firstName: 'Wandie',lastName: 'Innocent',email:'wandie@gmail.com',avatar: 'assets/img/logo.png',dateOfBirth: new Date()},
 { firstName: 'obwot',lastName: 'kanta',email:'wandie@gmail.com',avatar: 'assets/img/logo.png',dateOfBirth: new Date() },
 { firstName: 'ronald',lastName: 'Innocent',email:'wandie@gmail.com',avatar: 'assets/img/logo.png',dateOfBirth: new Date() },
 { firstName: 'abey',lastName: 'Innocent',email:'wandie@gmail.com',avatar: 'assets/img/logo.png',dateOfBirth: new Date() },
 { firstName: 'ali',lastName: 'Innocent',email:'wandie@gmail.com',avatar: 'assets/img/logo.png',dateOfBirth: new Date() },
 { firstName: 'sandie',lastName: 'Innocent',email:'wandie@gmail.com',avatar: 'assets/img/logo.png',dateOfBirth: new Date() }

];

export const USER_LIST = userList;
