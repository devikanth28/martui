import db from '../../../../DataBase/LocalDB';

class RecentlySearchedTests {

    maxTestLimit = 10;
    key = 'RECENTLY_VIEWED_TEST';

    getIndex(test) {
        const recentSearchData = this.getData();
        return recentSearchData.findIndex((eachTest) => {
            return eachTest.code === test.code;
        });
    }
    enqueue(test) {
        const index = this.getIndex(test);
        let recentSearchData = this.getData();
        if (index >= 0) {
            this.dequeueAtIndex(index);
            recentSearchData = this.getData();
            recentSearchData.push(test);
        } else {
            if (recentSearchData.length >= this.maxTestLimit) {
                this.dequeueAtIndex(0);
            }
            recentSearchData = this.getData();
            recentSearchData.push(test);
        }
        db.setObject(this.key, recentSearchData);
    }

    dequeue(test) {
        this.dequeueAtIndex(this.getIndex(test));
    }

    dequeueAtIndex(index) {
        let recentSearchData = this.getData();
        recentSearchData.splice(index, 1);
        db.setObject(this.key, recentSearchData);
    }

    getData() {
        let data = db.getObject(this.key);
        if (!data) {
            data = [];
        }
        return data;
    }
}
export default new RecentlySearchedTests();