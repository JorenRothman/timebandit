import { DB } from '@/constants/database';

// Delete all the data in the database
function reset() {
    DB.delete();
}

export default reset;
