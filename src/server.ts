import app from './app';
import sequelize from './utils/mysql';

const PORT = 3000;


(async () => {
    try {
        await sequelize.sync(/* {force: true} */);
        app.listen(PORT, function() {
            console.log(`Listening on port: ${PORT}`);
        });
    } catch {
        console.log(`Server not started`);
        process.exit(1);
    }
})();



