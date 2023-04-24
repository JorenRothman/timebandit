import { DB } from '@/constants/database';

// Delete all the data in the database
function reset() {
    DB.reset();
    console.log('Database successfully reset.');
}

export default reset;
