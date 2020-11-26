const fs = require("fs");
const path = require("path");

function getSchemas() {
  const schemasPath = path.resolve(__dirname, "schemas");
  const dirs = fs.readdirSync(schemasPath);
  const schemasGraph = {};
  dirs.forEach((index) => {
    const filename = index.split(".")[0];
    schemasGraph[filename] = require(path.resolve(schemasPath, index));
  });
  return schemasGraph;
}

class MongoDb {
  constructor(db) {
    this.db = db;
  }
  //增加
  add(obj) {
    return new Promise((resolve, reject) => {
      var newData = new this.db(obj);
      newData.save((err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  }
  //删除
  remove(obj) {
    return new Promise((resolve, reject) => {
      this.db.deleteMany(obj, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  }
  //更新
  update(obj, filter) {
    return new Promise((resolve, reject) => {
      this.db.updateMany(obj, filter, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  }
  //查询
  find(obj) {
    return new Promise((resolve, reject) => {
      this.db.find(obj, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  }
}

module.exports = function (name) {
  const cache = {};
  const document = getSchemas();

  if (document[name]) {
    if (!cache[name]) {
      cache[name] = new MongoDb(document[name]);
    }

    return cache[name];
  } else {
    throw new Error("Please define scheams" + name);
  }
};
