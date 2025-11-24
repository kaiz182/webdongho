import app from "./src/app.js";
import "dotenv/config";
import sequelize from "./src/config/database.js";

const PORT = process.env.PORT;

app.listen(PORT, async () => {
    console.log(`App running at: http://localhost:${PORT}`);

    try {
        await sequelize.authenticate();
        console.log("kết nối database thành công!");
    } catch (error) {
        console.log("kết nối k thành công", error);
    }
});
