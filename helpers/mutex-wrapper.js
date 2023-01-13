const { Mutex } = require("async-mutex");
const mutex = new Mutex();

const mutexWrapper = async (fun) => {
  const release = await mutex.acquire(); // lock mutex
  const _data = await fun();
  release(); // unlock mutex
  return _data;
};

module.exports = mutexWrapper;
