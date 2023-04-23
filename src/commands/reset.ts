import { DB } from '@/constants/database';

// Delete all the data in the database
function reset() {
    DB.serialize(() => {
        DB.run('DELETE FROM times');

        console.log('The database was successfully reset.');
    });
}

export default reset;
