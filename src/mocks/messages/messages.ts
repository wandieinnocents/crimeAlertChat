import { Message  } from '../../models/message/message.interface';
import { USER_LIST } from '../profiles/profiles';
// import { User  } from '../../models/user/user';




const userList = USER_LIST;
const messageList: Message[] = [];

userList.forEach((user) => {

  messageList.push({ user: user, date: new Date(),lastMessage: 'Lets reduce crime rates..' })


})


export const MESSAGE_LIST = messageList;
