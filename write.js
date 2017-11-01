module.exports = {
    dataBase: "db.json",
    write: function (dataBase) {
        const fs = require('fs');
        const content = JSON.stringify(dataBase);
        return new Promise((resolve, reject) =>
            fs.writeFile(this.dataBase, content, 'utf8', function (err) {
                if (err) {
                    reject(err);
                } else {
                    console.log("Exito guardando");
                    resolve();
                }
            })
        );
    },
    load: function () {
        const fs = require('fs');
        return new Promise((resolve, reject) =>
            fs.readFile(this.dataBase, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    let users = JSON.parse(data);
                    console.log("Exito leyendo");
                    resolve(users);
                }
            })
        );
    }
};


