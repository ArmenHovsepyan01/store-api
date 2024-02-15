import cron from 'node-cron';
import { User } from './database/models/models';

const DeleteUnverifiedUsers = () => {
  cron.schedule('*/5 * * * *', async () => {
    try {
      const user = await User.sequelize.query('DELETE FROM users WHERE isVerified=false');
      console.log(user, 'Deleted successfully');
    } catch (e) {
      console.error(`Something gone wrong ${e.message}.`);
    }
  });
};

export default DeleteUnverifiedUsers;
