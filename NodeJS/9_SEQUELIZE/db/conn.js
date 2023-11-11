//como conectar com o sequelize
import { Sequelize } from "sequelize";

export const conn = new Sequelize("nodesequelize", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

try {
  await conn.authenticate();
  console.log("Conectamos com sucesso com o Sequelize");
} catch (err) {
  console.log("Não foi possível conectar: ", err);
}
