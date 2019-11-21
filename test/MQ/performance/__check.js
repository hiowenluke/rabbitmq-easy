
const me = {
    startTime: null,
    lastCount: null,
    handler: null,
    counter: null,

    start(counter) {
        this.counter = counter;
        this.startTime = new Date().getTime();

        // There will be problems below 100 milliseconds
        this.handler = setInterval(() => {this.verify()}, 100);
    },

    verify() {
        const count = this.counter();

        if (this.lastCount !== count) {
            this.lastCount = count;
            return;
        }

        clearInterval(this.handler);

        const endTime = new Date().getTime();
        const during = (endTime - this.startTime) / 1000;
        const avg = Math.floor(count / during);

        console.log(`Done. \nTotal: ${count}, During: ${during}s, Avg: ${avg}/s`);
    }
};

module.exports = me;
